import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { MyComponents, MyComponentsType } from "./components/component-types";
import { IndeterminateCheckbox } from "./components/indeterminate-checkbox";
import { Switch, SwitchFree } from "./components/switches";
import { Table } from "./components/table";

const components: { key: MyComponents; component: React.FC<any> }[] = [
  {
    key: MyComponents.SWITCH,
    component: Switch,
  },
  {
    key: MyComponents.SWITCH_FREE,
    component: SwitchFree,
  },
  {
    key: MyComponents.INDETERMINATE_CHECKBOX,
    component: IndeterminateCheckbox,
  },
  { key: MyComponents.TABLE, component: Table },
];
function App() {
  const [selected, setSelected] = useState<MyComponents>(MyComponents.SWITCH);

  const handleSelectedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value as MyComponents);
  };

  const SelectedComponent = useMemo(() => {
    const found = components.find((c) => c.key === selected)?.component;
    return found ?? (() => <></>);
  }, [selected]);

  return (
    <>
      <section className="absolute right-1/2 translate-x-1/2">
        <label>Select a component</label>
        <div>
          <select value={selected} onChange={handleSelectedChange}>
            {Object.entries(MyComponents).map(([k, v]) => {
              return <option value={v}>{v}</option>;
            })}
          </select>
        </div>
      </section>
      <div className="flex flex-col gap-5 justify-center items-center h-screen w-screen">
        <SelectedComponent />
      </div>
    </>
  );
}

export default App;
