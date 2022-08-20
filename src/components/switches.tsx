import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";

export const Switch: FC<{ onChange?: (value: boolean) => void }> = ({
  onChange,
}) => {
  const [value, setValue] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "true";
    setValue(newValue);
    onChange?.(newValue);
  };
  const toggleChange = () => {
    setValue((prevValue) => !prevValue);
  };

  const translateClass = value ? `translate-x-full` : "";
  const bgSwitch = value ? `bg-green-500` : "";
  return (
    <section className="w-1/2 aspect-video">
      <input
        hidden
        type="checkbox"
        checked={value}
        value={value.toString()}
        onChange={handleChange}
      />
      <div
        className={`w-full h-full bg-gray-400 rounded-l-full rounded-r-full relative hover:cursor-pointer ${bgSwitch}`}
        onClick={toggleChange}
      >
        <div
          className={`absolute bg-gray-100 rounded-full w-[20vw] h-[20vw] transition-transform ease-linear duration-200  transform hover:scale-105 hover:bg-teal-100 -translate-y-1/2 left-[5vw] top-1/2 ${translateClass}`}
        ></div>
      </div>
    </section>
  );
};
export const SwitchFree: FC<{
  onChange?: (value: boolean) => void;
  size: number;
}> = ({ onChange, size }) => {
  const [value, setValue] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === "true";
    setValue(newValue);
    onChange?.(newValue);
  };
  const toggleChange = () => {
    setValue((prevValue) => !prevValue);
  };

  const translateClass = value ? `translate-x-full` : "";
  const bgSwitch = value ? `bg-green-500` : "";
  const ratio = 1.2;
  return (
    <section style={{ width: `${size * 2}px` }} className={`aspect-video`}>
      <input
        hidden
        type="checkbox"
        checked={value}
        value={value.toString()}
        onChange={handleChange}
      />
      <div
        className={`w-full h-full bg-gray-400 rounded-l-full rounded-r-full relative hover:cursor-pointer ${bgSwitch}`}
        onClick={toggleChange}
      >
        <div
          style={{
            left: `${size / (ratio * 5)}px`,
            width: `${size / ratio}px`,
            height: `${size / ratio}px`,
          }}
          className={`absolute bg-gray-100 rounded-full transition-transform ease-linear duration-200  transform hover:scale-105 hover:bg-teal-100 -translate-y-1/2 top-1/2 ${translateClass}`}
        ></div>
      </div>
    </section>
  );
};
