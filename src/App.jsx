import { Routes, Route } from "react-router-dom";
import RUTAS from "./router/router";
import Home from "./page/home/Home";
import Proyectos from "./page/proyects/Proyectos";
import Error404 from "./PageError/404";
import Layout from "./layouts/Layouts";
import Github from "./page/github/Github";
import RepoDetail from "./page/github/page/RepoDetail";
import FileViewer from "./page/github/page/code/FileViewer";
import ScrollToTop from "./page/components/ScrollToTop";
import ScrollToTopOnRouteChange from "./page/components/ScrollToTopOnRouteChange";
import Habilidades from "./page/habilidades/Habilidades";
const App = () => {
  return (
    <>
      <ScrollToTopOnRouteChange />
      <ScrollToTop />
      <Routes>
        <Route path={RUTAS.INICIO} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={RUTAS.PROYECTOS} element={<Proyectos />} />
          <Route path={RUTAS.GITHUB} element={<Github />} />
          <Route path={`${RUTAS.GITHUB}/:repoName`} element={<RepoDetail />} />
          <Route path="/github/:repoName/view/*" element={<FileViewer />} />
          <Route path={RUTAS.HABILIDADES} element={<Habilidades />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
