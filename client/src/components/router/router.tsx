import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Editor } from "../editor";
import { Home } from "../home";
import { Root } from "../root";
import { Scanner } from "../scanner";
import { RoutePaths } from "./route-paths";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.Home} element={<Root />}>
          <Route index element={<Home />} />
          <Route path={RoutePaths.Scanner} element={<Scanner />} />
          <Route path={RoutePaths.Editor} element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
