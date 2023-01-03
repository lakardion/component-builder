import { useState } from "react";
import { VolumeControl } from "../volume-control";

export const VolumeControlShow = () => {
  const [volume, setVolume] = useState(0);

  return <VolumeControl value={volume} onChange={setVolume} />;
};
