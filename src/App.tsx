import { Login } from "./pages/login/login";
import { Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routes/main-routes";
import { MainLayout } from "./layout/layout";
import { nanoid } from "@reduxjs/toolkit";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/app" element={<MainLayout />}>
        {mainRoutes?.map(({ component: Element, path }) => (
          <Route
            key={nanoid()}
            path={path}
            index={path ? false : true}
            element={<Element />}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
