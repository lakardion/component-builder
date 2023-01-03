import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import { SlVolume1, SlVolume2, SlVolumeOff } from "react-icons/sl";
import { useWatchHeight } from "../utils/dom";

export const VolumeControl: FC<{
  value: number;
  onChange: (vol: number) => void;
}> = ({ onChange, value }) => {
  const [showControlBar, setShowControlBar] = useState(false);
  const isDraggingProgressRef = useRef(false);
  const [instantValue, setInstantValue] = useState(value);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barHeight, setBarHeight] = useState(0);

  const onMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    isDraggingProgressRef.current = true;
  };
  const onMouseUp = () => {
    isDraggingProgressRef.current = false;
    onChange(instantValue);
  };
  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isDraggingProgressRef.current) {
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      const { bottom: minBottom, top: maxTop, height: maxTopHeight } = rect;
      const diff = minBottom - e.clientY;
      const exceedsTop = e.clientY < maxTop;
      const exceedsBottom = e.clientY >= minBottom;
      const forceMoved = exceedsBottom ? 0 : exceedsTop ? maxTopHeight : diff;
      const newValue = forceMoved / maxTopHeight;
      setInstantValue(newValue);
    }
  };
  const onMouseLeave = () => {
    isDraggingProgressRef.current = false;
  };

  useEffect(() => {
    setInstantValue((iv) => {
      if (iv !== value) return value;
      return iv;
    });
  }, [value]);

  console.log(
    "height",
    barHeight ? barHeight * instantValue + 5 : 0,
    barHeight
  );

  return (
    <section className="relative">
      <button
        type="button"
        onClick={() => {
          setShowControlBar((scb) => !scb);
        }}
      >
        {instantValue === 0 ? (
          <SlVolumeOff size={25} />
        ) : instantValue < 0.5 ? (
          <SlVolume1 size={25} />
        ) : (
          <SlVolume2 size={25} />
        )}
      </button>
      <p className="absolute -bottom-3/2 left-1/2 -translate-x-1/2 text-center">
        {Math.floor(instantValue * 100)}
      </p>
      {showControlBar ? (
        <div
          className="absolute bottom-[130%] -translate-x-1/2 left-1/2"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
        >
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-32 rounded-lg bg-black/30"
            ref={(ref) => {
              if (ref) {
                barRef.current = ref;
                setBarHeight(ref.clientHeight);
              }
            }}
          ></div>
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 rounded-lg bg-black"
            style={{
              height: barHeight ? barHeight * instantValue + 5 : 0,
            }}
          ></div>
          <div
            className="h-2.5 w-2.5 rounded-full bg-black cursor-pointer"
            onMouseDown={onMouseDown}
            style={{
              transform: `translateY(-${
                barHeight ? barHeight * instantValue - 5 : 0
              }px)`,
            }}
          ></div>
        </div>
      ) : null}
    </section>
  );
};
