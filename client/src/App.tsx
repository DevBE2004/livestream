import { Route, Routes } from "react-router-dom";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";
import LiveStreamViewer from "./components/LiveViewer";
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />} path="/">
          <Route element={<LiveStreamViewer />} path="" />
          <Route element={<Home />} path="/live" />
        </Route>
      </Routes>
    </>
  );
};

export default App;
