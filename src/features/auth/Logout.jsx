/**
 * @module auth/Logout
 * @description A button that logs the user out.
 */
import { useLogout } from "./useLogout";
import { Button, NavDropdown } from "react-bootstrap";

/**
 * Logout is a component that logs the user out.
 * @returns {JSX.Element} The JSX element for the Logout component.
 */
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
