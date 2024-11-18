import React from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../redux/appSlice";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(setModal({ isShowModal: false, contentModal: null }));
      }}
      className="absolute z-10 bg-black/85 h-screen w-screen flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Modal;
