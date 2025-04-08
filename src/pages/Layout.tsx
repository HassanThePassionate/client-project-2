import Header from "@/components/header/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className='py-[40px] px-12 min-w-[320px] max-w-[1440px] my-0 mx-auto w-full'>
        {children}
      </div>
    </>
  );
};

export default Layout;
