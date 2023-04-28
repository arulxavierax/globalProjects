import * as React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { sp } from "./Auth";

type UserData = {
  city: String;
  email: String;
  gender: String;
  name: String;
  phone: String;
};

interface IContext {
  data: UserData[];
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
  user: UserData[];
  setUser: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export const ContextApp = React.createContext<IContext | null>(null);

export const getData = async () => {
  const items: any[] = await sp.web.lists.getByTitle("user").items();
  return items;
};

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<UserData[]>();
  const [user, setUser] = React.useState<UserData[]>();

  React.useEffect(() => {
    getData().then((res) => {
      setData(res);
      setUser(res);
    });
  }, [data, setData]);

  return (
    <ContextApp.Provider value={{ data, setData, user, setUser }}>
      {children}
    </ContextApp.Provider>
  );
};
export type { IContext, UserData };
export default AppContextProvider;
