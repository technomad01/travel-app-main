import { createContext, useState } from "react";

export const CurrentUserContext = createContext();

export default function CurrentUserProvider(props) {
  const [currentUser, setCurrentUser] = useState();

  return (
    <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}
