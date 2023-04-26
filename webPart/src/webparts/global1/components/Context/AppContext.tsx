import * as React from "react";

type UserData = {
  id: String;
  city: String;
  department: String;
  dob: String;
  email: String;
  gender: String;
  language: String;
  name: String;
  phone: String;
  designation: string;
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

  React.useEffect(() => {
    const items = sp.web.lists.getByTitle("user").items();
    console.log(items);
  }, []);

  return (
    <ContextApp.Provider value={{ data, setData, users }}>
      {children}
    </ContextApp.Provider>
  );
};
export type { IContext, UserData };
export default AppContextProvider;
