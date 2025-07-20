import { Routes, Route } from "react-router-dom";
import RUTAS from "./router/router";
import Home from "./page/home/Home";
import Proyectos from "./page/proyects/Proyectos";
import Error404 from "./PageError/404";
import MainLayout from "./layouts/Layout";

const App = () => {
  return (
    <Routes>
      <Route path={RUTAS.INICIO} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={RUTAS.PROYECTOS} element={<Proyectos />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
