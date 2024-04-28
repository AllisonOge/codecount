import { useLogout } from "./useLogout";

export default function Logout() {
  const { logout, isLoading } = useLogout();
  
  return (
    <input
      type="button"
      value="Logout"
      onClick={logout}
      disabled={isLoading}
    />
  );
}
