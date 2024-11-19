import { useForm } from "react-hook-form";
import InputForm from "../form/InputForm";
import { apiVerifyForgotPassword } from "../../apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setModal } from "../../redux/appSlice";
import ResetPassword from "./ResetPassword";

const VerifyForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { emailForgotPassword } = useSelector((state: any) => state.me);
  const dispatch = useDispatch();

  const onsubmit = async (data: any) => {
    const response = await apiVerifyForgotPassword({
      email: emailForgotPassword.email,
      code: data.code,
    });
    if (response.data.success) {
      dispatch(
        setModal({ isShowModal: true, contentModal: <ResetPassword /> })
      );
      reset();
    } else {
      toast.error(response.data.mes);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-[400px] w-min-[700px] bg-gray-100 rounded-md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Verify Code</h2>
        <form onSubmit={handleSubmit(onsubmit)}>
          <InputForm
            register={register}
            id="code"
            errors={errors}
            placeholder="Enter your verification code"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;
