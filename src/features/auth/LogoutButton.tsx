import { logout } from "@/lib/actions/auth";
import { HiOutlineLogout } from "react-icons/hi";

function LogoutButton() {
  return (
    <button
      className=" size-12 p-3 [&>svg]:size-6 bg-red-50 border border-red-200 flex justify-center items-center text-red-600 rounded-full hover:bg-red-100 duration-300"
      onClick={logout}
    >
      <HiOutlineLogout />
    </button>
  );
}

export default LogoutButton;
