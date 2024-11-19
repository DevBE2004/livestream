import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/appSlice";
import { getComponentName } from "../../utils/helper";

interface ModalProps {
  children: React.ReactNode;
  disableClose?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();
  const componentName = getComponentName(children);

  const disableClose = componentName === "Loading";

  return (
    <div
      onClick={() => {
        if (!disableClose) {
          dispatch(setModal({ isShowModal: false, contentModal: null }));
        }
      }}
      className="absolute z-10 bg-black/85 h-screen w-screen flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
