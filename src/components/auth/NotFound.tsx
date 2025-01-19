import { Link } from "react-router-dom";
import instagramLogoLetter from "@/assets/images/instagram.svg";

const NotFoundAuth = () => {
  return (
    <>
      <div className="border-b border-[#DBDBDB] fixed top-0 dark:border-[#2f3336] w-full p-2 py-3 flex aling-center justify-center">
        <div className="max-w-[900px] w-full flex justify-between items-center">
          <div>
            <Link
              to="/accounts/sign-in"
              className="text-center text-[#00376B] dark:text-[#E0F1FF] text-sm mt-10 mx-auto"
            >
              <img
                className="dark:invert"
                width={110}
                src={instagramLogoLetter}
                alt=""
              />
            </Link>
          </div>

          <div>
            <Link
              to="/accounts/sign-in"
              className="bg-[#0095F6] hover:bg-[#1877f2] font-bold text-white mr-4 p-2 px-4 rounded-md text-sm mt-10 mx-auto"
            >
              Log In
            </Link>

            <Link
              to="/accounts/sign-up"
              className="text-[#0095F6] text-sm mt-10 mx-auto"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-screen mt-24">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Sorry, this page isn't available.
        </h1>
        <p className="text-center">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <a
            className="text-[#00376B] dark:text-[#E0F1FF]"
            href="/accounts/sign-in"
          >
            Go back to Instagram.
          </a>
        </p>
      </div>
    </>
  );
};

export default NotFoundAuth;
