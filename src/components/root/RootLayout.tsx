import { Outlet } from "react-router-dom";
import Topbar from "../shared/Topbar";
import LeftSidebar from "../shared/LeftSidebar";
import Bottombar from "../shared/Bottombar";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
