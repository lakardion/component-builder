import { useEffect, useState } from "react";
import { ProgressBar } from "../progress-bar";

export const ProgressBarShow = () => {
  const [currentSeconds, setCurrentSeconds] = useState(30);
  const [totalSeconds, setTotalSeconds] = useState(60);
  return (
    <ProgressBar
      currentSeconds={currentSeconds}
      totalSeconds={totalSeconds}
      onChange={(s) => setCurrentSeconds(s)}
      className="bg-black w-full"
    />
  );
};
