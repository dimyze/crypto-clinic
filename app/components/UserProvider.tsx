"use client";

import { createContext, useContext } from "react";

const UserContext = createContext({
  username: "",
  privateKey: "",
});

interface User {
  username: string;
  privateKey: string;
}

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
