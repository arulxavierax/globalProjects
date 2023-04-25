import { createContext, useState, ReactNode } from "react";

type UserData = {
  id: String;
  city: String;
  department: String;
  dob: String;
  email: String;
  gender: String;
  language: String;
  name: String;
  phone: number;
  designation: string;
};

interface IContext {
  data: UserData[];
  setData: React.Dispatch<React.SetStateAction<UserData[]>>;
  users: UserData[];
}

export const ContextApp = createContext<IContext | null>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  let users = JSON.parse(localStorage.getItem("user") || "[]");
  const [data, setData] = useState<UserData[]>(users);

  return (
    <ContextApp.Provider value={{ data, setData, users }}>
      {children}
    </ContextApp.Provider>
  );
};
export type { IContext, UserData };
export default AppContextProvider;
