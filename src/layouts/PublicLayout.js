import { Outlet } from "react-router-dom";
import { Footer } from "../components";

const PublicLayout = () => {
  return (
    <div className="w-full mx-auto h-full bg-primary ">
      {/* <div className="w-full  sticky top-0 z-10"> */}
      {/* <PublicHeader /> */}
      <Outlet />
      <Footer />
      {/* </div> */}
    </div>
  );
};

export default PublicLayout;
