import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div>
      For guest layout only
      <Outlet />
    </div>
  );
}
