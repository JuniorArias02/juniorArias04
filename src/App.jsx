import { Routes, Route } from "react-router-dom";
import RUTAS from "./router/router";
import Layout from "./layouts/Layout";
import Home from "./page/home/Home";
import Proyectos from "./page/proyects/Proyectos";
import Error404 from "./PageError/404";

const App = () => {
  return (
    <Routes>
      <Route path={RUTAS.INICIO} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RUTAS.PROYECTOS} element={<Proyectos />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default App;
