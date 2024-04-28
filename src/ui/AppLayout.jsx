import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom/dist";
import Logout from "../features/auth/Logout";

export default function AppLayout() {
  return (
    <>
      <nav>
        <p>CodeCount</p>
        <ul>
          <Link to="/dashboard">Dashboard</Link>
          <br />
          <Link to="/projects">Projects</Link>
          <br />
          <Link to="/earnings">Earnings</Link>
        </ul>
        <ul>
          <Link>Welcome</Link>
          <ul>
            <Link to="/profile">Profile</Link>
            <br />
            <Logout />
          </ul>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
