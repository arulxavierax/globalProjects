import * as React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from "./Auth";

type UserData = {
  id: string;
  city: String;
  email: String;
  gender: String;
  name: String;
  phone: String;
};

interface IContext {
  data: UserData[];
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
  users: UserData[];
}

export const ContextApp = React.createContext<IContext | null>(null);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  let users = JSON.parse(localStorage.getItem("user") || "[]");
  const [data, setData] = React.useState<UserData[]>(users);

  const getData = async () => {
    const items: any[] = await sp.web.lists.getByTitle("user").items();
    setData(items);
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <ContextApp.Provider value={{ data, setData, users }}>
      {children}
    </ContextApp.Provider>
  );
};
export type { IContext, UserData };
export default AppContextProvider;
