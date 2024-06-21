import { useAppDispatch } from "../../hooks/useTypedDispatch";
import Cookies from "universal-cookie";
import { fetchRegister } from "../../redux/slices/auth";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

export const Registration = () => {
  const dispatch = useAppDispatch();
  const cookies = new Cookies();
  const [registered, setRegistered] = useState(false);

  const onSubmit = async (values: any) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload || !("token" in data.payload)) {
      alert("Не удалось зарегистрироваться! Повторите попытку.");
    } else {
      const decoded: any = jwtDecode(data.payload.token);
      cookies.set("token", data.payload.token, {
        expires: new Date(decoded.exp * 1000),
      });
      alert("Успешная регистрация! Войдите в аккаунт.");
      setRegistered(true);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  if (registered) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h3 className="text-center">Регистрация</h3>
      <div className="container w-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-1 p-2">
            <label className="form-label" htmlFor="fullNameInput">
              ФИО
            </label>
            <input
              type="text"
              className="form-control"
              id="fullNameInput"
              {...register("firstName", { required: "Укажите Ваше ФИО." })}
              placeholder="Иванов Иван Иванович"
              required
              autoFocus
            />
            <div className="invalid-feedback">
              {Boolean(errors.firstName?.message)}
            </div>
          </div>

          <div className="form-group mb-1 p-2">
            <label className="form-label" htmlFor="usernameInput">
              Логин
            </label>

            <input
              type="text"
              className="form-control"
              id="usernameInput"
              {...register("username", { required: "Укажите Ваш логин." })}
              placeholder="ivanov123"
              required
            />
          </div>

          <div className="form-group mb-2 p-2">
            <label className="form-label" htmlFor="passwordInput">
              Пароль
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              {...register("password", { required: "Укажите Ваш пароль." })}
              placeholder="Пароль"
              required
            />
          </div>
          <div className="form-group mb-2 p-2">
            <button
              disabled={!isValid}
              type="submit"
              className="btn btn-primary"
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
