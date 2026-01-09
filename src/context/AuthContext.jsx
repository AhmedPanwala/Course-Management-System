import React, { createContext, useState } from "react";

export let Auth = createContext();
const AuthContext = ({ children }) => {
  let [user, setUser] = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  });
  let login = (loginData) => {
    setUser(loginData);
    localStorage.setItem("user", JSON.stringify(loginData));
  };
  console.log(user);
  let logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Auth.Provider value={{ login, user, logout }}>{children}</Auth.Provider>
  );
};

export default AuthContext;