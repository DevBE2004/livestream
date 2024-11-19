import { useForm } from "react-hook-form";
import InputForm from "../form/InputForm";
import { apiResetPassword } from "../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setModal } from "../../redux/appSlice";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { emailForgotPassword } = useSelector((state: any) => state.me);
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const response = await apiResetPassword({
      email: emailForgotPassword.email,
      password: data.password,
    });

    if (response.data.success) {
      toast.success(response.data.mes);
      dispatch(setModal({ isShowModal: false, contentModal: null }));
    } else toast.error(response.data.mes);
  };

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp!");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  return (
    <div className="flex items-center justify-center min-h-[500px] bg-gray-100 rounded-md w-min-[700px]">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            register={register}
            id="password"
            errors={errors}
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          <InputForm
            register={register}
            id="confirmPassword"
            errors={errors}
            placeholder="Confirm your password"
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
