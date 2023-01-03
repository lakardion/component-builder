import { MouseEvent, useState } from "react";
import { Switch, SwitchFree } from "./switches";

export const ComposedSwitch = () => {
  /**
   * 1. Logica
   */
  const [value, setValue] = useState(false);
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setValue((previous) => !previous);
    if (!value) alert("Hola");
  };

  /**
   * 2. Maqueta (?)
   * Cada <XXXX> es un "componente" y se pueden combinar varios para armar lo que se te ocurra
   */
  return (
    <section
      /**
       * 3. Estilo
       */
      className="flex flex-col justify-center items-center"
    >
      <p>Holaa estoy desde acá subiendo esto</p>
      <SwitchFree size={52} value={value} toggle={handleToggle} />
    </section>
  );
};
