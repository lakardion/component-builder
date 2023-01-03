import { MutableRefObject, useEffect, useState } from "react";

export const useWatchWidth = (ref: MutableRefObject<HTMLDivElement | null>) => {
  const [width, setWidth] = useState<number>();
  useEffect(() => {
    if (!width && ref.current) {
      setWidth(ref.current.clientWidth);
    }
    const domListener: ResizeObserverCallback = (e) => {
      const [first] = e;
      setWidth(first.target.clientWidth);
    };
    const obs = new ResizeObserver(domListener);
    ref.current && obs.observe(ref.current);
    return () => {
      obs.disconnect();
    };
  }, [width]);

  return width;
};

export const useWatchHeight = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    setTimeout(() => {
      if (!height && ref.current) {
        setHeight(ref.current.clientHeight);
      }
    }, 500);
  }, [height]);

  useEffect(() => {
    const domListener: ResizeObserverCallback = (e) => {
      const [first] = e;
      setHeight(first.target.clientHeight);
    };
    const obs = new ResizeObserver(domListener);
    ref.current && obs.observe(ref.current);
    return () => {
      obs.disconnect();
    };
  }, [height]);

  return height;
};
