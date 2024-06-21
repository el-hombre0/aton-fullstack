import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import React from "react";
import { Clients } from "../Clients";
export const Main = () => {
  const isAuth = useSelector(selectIsAuth);


  return (
    <>
    {isAuth? <Clients/> : <div className="container">Вам необходимо авторизироваться!</div>}
    </>
  );
};
