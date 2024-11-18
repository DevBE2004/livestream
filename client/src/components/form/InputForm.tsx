import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { UseFormRegister } from "react-hook-form";

interface InputFormProps {
  style?: string;
  containerClassname?: string;
  labelClassName?: string;
  id: string;
  label?: string;
  type?: string;
  register: UseFormRegister<any>;
  errors?: any;
  inputClassname?: string;
  validate?: { [key: string]: string | boolean };
  placeholder?: string;
}

const InputForm: React.FC<InputFormProps> = ({
  style = "form-input",
  containerClassname,
  labelClassName,
  id,
  label,
  type = "text",
  register,
  errors = {},
  inputClassname,
  validate = { required: `${id} is required` },
  placeholder = `Enter your ${id}...`,
}) => {
  return (
    <div className={twMerge(clsx("w-full flex flex-col gap-2", containerClassname))}>
      {label && (
        <label htmlFor={id} className={twMerge(clsx("text-gray-700 font-semibold", labelClassName))}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={twMerge(
          clsx(
            style,
            "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200",
            {
              "border-red-500": errors[id],
              "border-gray-300": !errors[id],
            },
            inputClassname
          )
        )}
        {...register(id, validate)}
        placeholder={placeholder}
      />
      {errors && <small className="text-red-500">{errors[id]?.message}</small>}
    </div>
  );
};

export default InputForm;