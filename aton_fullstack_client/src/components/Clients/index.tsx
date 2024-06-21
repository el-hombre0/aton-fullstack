import React from "react";

import { useEffect } from "react";
import { fetchClients } from "../../redux/slices/clients";
import { useAppDispatch } from "../../hooks/useTypedDispatch";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { Link } from "react-router-dom";

const options = [
  {
    label: "Не в работе",
    value: "NOT_IN_PROCESS",
  },
  {
    label: "В работе",
    value: "IN_PROCESS",
  },
  {
    label: "Отмена",
    value: "REJECTION",
  },
  {
    label: "Закрыт",
    value: "CLOSED",
  },
];
export const Clients = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const clientsList = useSelector((state: any) => state.clients.clients);
  useEffect(() => {
    dispatch(fetchClients());
  }, []);
  const isListLoading = clientsList.status === "loading";
  const isListError = clientsList.status === "error" && !isAuth;

  const { handleSubmit, control } = useForm({ mode: "onChange" });
  const onSubmit = async () => {};
  return (
    <>
      <div className="container">
        <h1>Список клиентов</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>Дата рождения</th>
              <th>ИНН</th>
              <th>Ответственный</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {isListError
              ? alert("Ошибка загрузки клиентов, авторизируйтесь!")
              : isListLoading
              ? [...Array(5)]
              : clientsList.items.map((client: any) => (
                  <tr
                    key={client.id}
                  >
                    <td>{client.id}</td>
                    <td>{client.firstName}</td>
                    <td>{client.middleName}</td>
                    <td>{client.lastName}</td>
                    <td>{client.birthday}</td>
                    <td>{client.inn}</td>
                    <td>{client.user.fullname}</td>
                    <td>
                      {client.status}
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                          control={control}
                          name="orderStatus"
                          rules={{ required: "Статус обязателен!" }}
                          render={({
                            field: { onChange, value, name, ref },
                          }) => (
                            <Select
                              ref={ref}
                              placeholder="Роли"
                              options={options}
                              value={options.find((c) => c.value === value)}
                              onChange={(val) => onChange(val?.value)}
                              defaultValue={{
                                label: client.status,
                                value: client.status,
                              }}
                            />
                          )}
                        />
                      </form>
                    </td>
                    <td>
                      <Link to={`/edit-client/${client.id}`}>Подробнее</Link>
                    </td>
                  </tr>
                ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
