import { useLogout } from "./useLogout";
import { Button, NavDropdown } from "react-bootstrap";

export default function Logout() {
  const { logout, isLoading } = useLogout();

  return (
    <Button
      as={NavDropdown.Item}
      variant="secondary"
      onClick={logout}
      disabled={isLoading}
    >
      Logout
    </Button>
  );
}
