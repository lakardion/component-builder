import {
  useRef,
  useState,
  useEffect,
  FC,
  DragEvent,
  MouseEvent,
  useMemo,
} from "react";
import { secondsToDuration } from "../utils/date";

export const ProgressBar: FC<{
  totalSeconds: number;
  currentSeconds: number;
  className?: string;
  onChange: (newSeconds: number) => void;
}> = ({ currentSeconds, totalSeconds, className = "", onChange }) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [currentProgressBarWidth, setCurrentProgressBarWidth] =
    useState<number>();
  const currentProgressDotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!currentProgressBarWidth && progressBarRef.current) {
      setCurrentProgressBarWidth(progressBarRef.current.clientWidth);
    }
    const domListener: ResizeObserverCallback = (e) => {
      const [first] = e;
      setCurrentProgressBarWidth(first.target.clientWidth);
    };
    const obs = new ResizeObserver(domListener);
    progressBarRef.current && obs.observe(progressBarRef.current);
    return () => {
      obs.disconnect();
    };
  }, [currentProgressBarWidth]);

  // const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const isDraggingProgressRef = useRef(false);
  const [forceMovedX, setForceMovedX] = useState<number>();
  const [
    /**
     * Intermediary seconds to instantly show seconds on progress bar, but only commit them once the use stops dragging
     */
    instantSeconds,
    setInstantSeconds,
  ] = useState(currentSeconds);
  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    isDraggingProgressRef.current = true;
    // setIsDraggingProgress(true);
  };
  const onMouseUp = () => {
    isDraggingProgressRef.current = false;
    // setIsDraggingProgress(false);
    onChange(instantSeconds);
  };
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDraggingProgressRef.current) {
      const rect = progressBarRef.current?.getBoundingClientRect();
      if (!rect) return;
      const { left: minLeft, right: maxRight, width: maxRightWidth } = rect;
      const diff = e.clientX - minLeft;
      const exceeds = e.clientX > maxRight;
      const forceMoved = diff <= 0 ? 0 : exceeds ? maxRightWidth : diff;
      const forceMovedWithOffset = forceMoved - 7;
      setForceMovedX(forceMovedWithOffset);
      const newValue = (forceMoved / maxRightWidth) * totalSeconds;

      setInstantSeconds(newValue);
    }
  };
  const onMouseLeave = () => {
    isDraggingProgressRef.current = false;
  };

  const handleBarClick = (e: MouseEvent) => {
    const rect = progressBarRef.current?.getBoundingClientRect();
    if (!rect || !currentProgressBarWidth) return;
    const newSeconds =
      (totalSeconds * (e.clientX - rect.left)) / currentProgressBarWidth;
    setInstantSeconds(newSeconds);
    onChange(newSeconds);
  };

  return (
    <section
      aria-label="controls"
      className={"flex items-center gap-4 " + className}
    >
      <p
        role="status"
        aria-label="current time"
        className="text-2xs text-center w-12 text-black dark:text-white w-"
      >
        {secondsToDuration(instantSeconds)}
      </p>
      <div
        role="status"
        aria-label="progress bar"
        className="relative flex-grow py-3"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
      >
        <div
          className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-lg bg-black/30 dark:bg-white/30 cursor-pointer"
          ref={progressBarRef}
          onClick={handleBarClick}
        ></div>
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-lg bg-black/30 dark:bg-white"
          style={{
            width:
              forceMovedX !== undefined
                ? forceMovedX + 7
                : currentProgressBarWidth && totalSeconds
                ? (currentProgressBarWidth * currentSeconds) / totalSeconds + 7
                : 0,
          }}
        ></div>
        <div
          className="h-3.5 w-3.5 cursor-pointer rounded-full bg-black dark:bg-white"
          onMouseDown={onMouseDown}
          ref={currentProgressDotRef}
          style={{
            transform: `translateX(${
              forceMovedX !== undefined
                ? forceMovedX
                : currentProgressBarWidth && totalSeconds
                ? (currentProgressBarWidth * currentSeconds) / totalSeconds
                : 0
            }px)`,
          }}
        ></div>
      </div>
      <p
        aria-label="total time"
        className="text-2xs text-center w-12 text-black dark:text-white"
      >
        {totalSeconds ? secondsToDuration(totalSeconds) : null}
      </p>
    </section>
  );
};
