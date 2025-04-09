import Header from "@/components/header/Header";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Header />

      <div className='py-[40px] px-12 min-w-[320px] max-w-[1440px] my-0 mx-auto w-full'>
        <Outlet />
      </div>
      <footer></footer>
    </>
  );
};

export default Layout;
