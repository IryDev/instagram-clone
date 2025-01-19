import { footerLinks } from "../../../constants/data";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex justify-between flex-col">
      <div className="flex flex-col h-screen mt-24">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Sorry, this page isn't available.
        </h1>
        <p className="text-center">
          The link you followed may be broken, or the page may have been
          removed.{" "}
          <Link className="text-[#00376B] dark:text-[#E0F1FF]" to="/">
            Go back to Instagram.
          </Link>
        </p>
      </div>

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
  );
};

export default NotFound;
