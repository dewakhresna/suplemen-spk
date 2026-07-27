import Cookies from "js-cookie";
import { useRouter } from "next/router";

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });

    localStorage.removeItem("chat_history");

    window.location.href = "/";
  };

  return handleLogout;
};
