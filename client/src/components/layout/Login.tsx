import banneLogin from "../../assets/banner-login.jpg";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import InputForm from "../form/InputForm";
import { clsx } from "clsx";
import { apiForgotPassword, apiSignIn, apiSignUp } from "../../apis/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/appSlice";
import { setEmailForgotPassword, setToken } from "../../redux/meSlice";
import VerifyForgotPassword from "./VerifyForgotPassword";
import Loading from "../common/Loading";

const Login = () => {
  const [toggleLoginStatus, setToggleLoginStatus] = useState<string>("Login");
  const dispatch = useDispatch();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (toggleLoginStatus === "Login") {
      await apiSignIn(data)
        .then((response) => {
          dispatch(setToken({ token: response.data.accesstoken }));
          reset();
          dispatch(setModal({ isShowModal: false, contentModal: null }));
          toast(`🦄 ${response.data.mes}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        })
        .catch((errors) => {
          toast(`🦄${errors.mes}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else if (toggleLoginStatus === "Register") {
      await apiSignUp(data)
        .then((response) => {
          setToggleLoginStatus("Login");

          toast(`🦄 ${response.data.mes}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          reset();
        })
        .catch((errors) => {
          toast(`🦄${errors.mes}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else if (toggleLoginStatus === "Forgotpassword") {
      dispatch(setModal({ isShowModal: true, contentModal: <Loading /> }));
      await apiForgotPassword(data)
        .then((response) => {
          toast(`🦄 ${response.data.message}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          dispatch(setEmailForgotPassword({ emailForgotPassword: data }));
          dispatch(
            setModal({
              isShowModal: true,
              contentModal: <VerifyForgotPassword />,
            })
          );
          reset();
        })
        .catch((errors) => {
          dispatch(setModal({ isShowModal: false, contentModal: null }));
          toast(`🦄${errors.mes}!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };
  return (
    <div
      className="grid grid-cols-10 w-[60%] bg-white rounded-lg shadow-lg overflow-hidden"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="col-span-4">
        <img
          src={banneLogin}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-6 flex flex-col gap-4 p-8">
        <div className="flex items-center justify-center gap-6 font-bold text-lg">
          <span
            onClick={() => {
              setToggleLoginStatus("Login");
              reset();
            }}
            className={clsx("cursor-pointer transition-colors duration-200", {
              "text-blue-600 border-b-2 border-blue-600":
                toggleLoginStatus === "Login",
              "text-gray-500": toggleLoginStatus !== "Login",
            })}
          >
            Login
          </span>
          <span
            onClick={() => {
              setToggleLoginStatus("Register");
              reset();
            }}
            className={clsx("cursor-pointer transition-colors duration-200", {
              "text-blue-600 border-b-2 border-blue-600":
                toggleLoginStatus === "Register",
              "text-gray-500": toggleLoginStatus !== "Register",
            })}
          >
            Register
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {toggleLoginStatus === "Login" && (
            <Fragment>
              <InputForm register={register} id="email" errors={errors} />
              <InputForm
                register={register}
                id="password"
                type="password"
                errors={errors}
              />
            </Fragment>
          )}
          {toggleLoginStatus === "Register" && (
            <Fragment>
              <InputForm register={register} id="username" errors={errors} />
              <InputForm register={register} id="email" errors={errors} />
              <InputForm
                register={register}
                id="password"
                type="password"
                errors={errors}
              />
            </Fragment>
          )}
          {toggleLoginStatus === "Forgotpassword" && (
            <Fragment>
              <InputForm register={register} id="email" errors={errors} />
            </Fragment>
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {toggleLoginStatus}
          </button>
        </form>
        <span
          className="mt-4 text-blue-600 cursor-pointer hover:underline"
          onClick={() => {
            setToggleLoginStatus("Forgotpassword");
            reset();
          }}
        >
          quên mật khẩu?
        </span>
      </div>
    </div>
  );
};

export default Login;
