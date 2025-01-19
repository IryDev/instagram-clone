import { Outlet, Navigate } from "react-router-dom";
import { footerLinks } from "@/constants/data";
import { useUserContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex flex-col items-center w-full h-full ">
          <Outlet />
          <footer className="px-4 py-4 flex gap-y-6 gap-1 gap-x-4 justify-center items-center flex-wrap mt-10">
            {footerLinks.map((link, index) =>
              link.link ? (
                <a
                  key={link.title}
                  className="text-xs text-[#71767b] hover:underline hover:underline-offset-1"
                  href={link.link}
                  target="_blank"
                >
                  {link.title}
                </a>
              ) : (
                <p key={index} className="text-xs  text-[#71767b]">
                  {link.title}
                </p>
              )
            )}
          </footer>
        </div>
      )}
    </>
  );
};

export default AuthLayout;
