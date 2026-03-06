import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../store/authStore";
import useLayoutStore from "../../store/layoutStore";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { title, showBackButton } = useLayoutStore();
  return (
    <div className="flex justify-between p-4 px-6 border-t border-gray-200">
      <div className="flex items-center justify-center gap-1">
        {showBackButton && (
          <button onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
        )}
        <span className="text-xl font-semibold">{title}</span>
      </div>
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <img
            src={user.image}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user.username}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
