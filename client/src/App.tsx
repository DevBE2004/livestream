import { Route, Routes } from "react-router-dom";
import PublicLayout from "./pages/PublicLayout";
import Home from "./pages/Home";
import LiveStreamViewer from "./pages/LiveViewer";
import Modal from "./components/common/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetMe } from "./apis/user";
import { setLoginState } from "./redux/meSlice";

const App = () => {
  const { isShowModal, contentModal } = useSelector((state: any) => state.app);
  const { token } = useSelector((state: any) => state.me);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDataMe = async () => {
      const response = await apiGetMe();
      dispatch(setLoginState({ me: response.data.me, isLogin: true }));
    };
    if (token) fetchDataMe();
  }, [token, dispatch]);

  return (
    <>
      {isShowModal && <Modal children={contentModal} />}
      <Routes>
        <Route element={<PublicLayout />} path="/">
          <Route element={<LiveStreamViewer />} path="" />
          <Route element={<Home />} path="/live" />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </>
  );
};

export default App;
