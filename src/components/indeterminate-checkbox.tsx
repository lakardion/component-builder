import { useRef, useState } from "react";

export const IndeterminateCheckbox: React.FC<{
  indeterminate: boolean;
  checked: boolean;
}> = ({ indeterminate = false, checked }) => {
  const ref = useRef<HTMLInputElement>(null);

  if (ref.current && indeterminate) {
    ref.current.checked = false;
    ref.current.indeterminate = indeterminate;
  }

  return <input type="checkbox" ref={ref} readOnly checked={checked} />;
};
