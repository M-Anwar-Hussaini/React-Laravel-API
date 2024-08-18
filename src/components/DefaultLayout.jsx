import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
  const { user, token } = useStateContext();
  const { setToken, setUser } = useStateContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/logout");
      setToken(null);
      setUser({});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#" className="btn-logout" onClick={onLogout}>
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
