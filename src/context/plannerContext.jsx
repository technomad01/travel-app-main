import { createContext, useState } from "react";

export const PlannerIDsContext = createContext();

export default function PlannerIDsContextProvider(props) {
  const [plannerIDsData, setPlannerIDsData] = useState();

  return (
    <PlannerIDsContext.Provider value={[plannerIDsData, setPlannerIDsData]}>
      {props.children}
    </PlannerIDsContext.Provider>
  );
}
