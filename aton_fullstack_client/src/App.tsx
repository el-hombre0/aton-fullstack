import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import React from "react";
import { Main, Authentication, Clients } from "./components";
import { Registration } from "./components/Registration";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="register" element={<Registration />}></Route>
        <Route path="login" element={<Authentication />}></Route>
        <Route path="clients" element={<Clients />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
