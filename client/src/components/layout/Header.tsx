import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { setModal } from "../../redux/appSlice";
import { User } from "lucide-react";
import { memo, useState } from "react";
import { setLoginState, setToken } from "../../redux/meSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: any) => state.me);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    dispatch(setToken({ token: null }));
    dispatch(setLoginState({ me: null, isLogin: false }));
  };

  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">My Website</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-blue-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-300 transition">
                Services
              </a>
            </li>
            {me ? (
              <li className="relative flex items-center gap-2 cursor-pointer">
                <span onClick={() => setShowDropdown((prev) => !prev)}>
                  {me.username}
                </span>
                <span>
                  <User size={16} />
                </span>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                    <div
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <span
                  onClick={() => {
                    dispatch(
                      setModal({ isShowModal: true, contentModal: <Login /> })
                    );
                  }}
                  className="cursor-pointer hover:text-blue-300 transition"
                >
                  Login
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default memo(Header);
