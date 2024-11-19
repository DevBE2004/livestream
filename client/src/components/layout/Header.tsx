import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";
import { setModal } from "../../redux/appSlice";
import { User } from "lucide-react";
import { memo, useState, useRef, useEffect } from "react";
import { setLoginState, setToken } from "../../redux/meSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state: any) => state.me);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    dispatch(setToken({ token: null }));
    dispatch(setLoginState({ me: null, isLogin: false }));
  };

  const handleProfile = () => {
    // Logic for navigating to the profile page
  };

  const handleChangePassword = () => {
    // Logic for handling password change
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Kiểm tra nếu click ra ngoài dropdown
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold tracking-wide">My Website</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200"
              >
                Services
              </a>
            </li>
            {me ? (
              <li className="relative flex items-center gap-2 cursor-pointer">
                <span
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="flex items-center"
                >
                  {me.username}
                  <User size={16} className="ml-1" />
                </span>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-20 top-7 w-48 bg-white text-black rounded-lg shadow-lg transition-opacity duration-200"
                  >
                    <div
                      onClick={handleLogout}
                      className="p-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                    >
                      Logout
                    </div>
                    <div
                      onClick={handleProfile}
                      className="p-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                    >
                      Profile
                    </div>
                    <div
                      onClick={handleChangePassword}
                      className="p-2 hover:bg-gray-200 cursor-pointer transition-colors duration-200"
                    >
                      Change Password
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
                  className="cursor-pointer hover:text-blue-400 transition duration-200"
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
