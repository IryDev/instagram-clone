import activeCreate from "@/assets/icons/create-active.svg";
import create from "@/assets/icons/create.svg";
import explore from "@/assets/icons/explore.svg";
import activeHome from "@/assets/icons/home-active.svg";
import home from "@/assets/icons/home.svg";
import activeMessage from "@/assets/icons/messages-active.svg";
import messages from "@/assets/icons/messages.svg";
import more from "@/assets/icons/more.svg";
import notifications from "@/assets/icons/notifications.svg";
import avatar from "@/assets/icons/profile-placeholder.svg";
import reels from "@/assets/icons/reels.svg";
import search from "@/assets/icons/search.svg";
import instagramLogoLetter from "@/assets/images/instagram.svg";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  const { mutate: signOut } = useSignOutAccount();

  const navLinks = [
    { to: "/", icon: home, activeIcon: activeHome, label: "Home" },
    { to: "/search", icon: search, label: "Search" },
    { to: "/explore", icon: explore, label: "Explore" },
    {
      to: "/messages",
      icon: messages,
      activeIcon: activeMessage,
      label: "Messages",
    },
    { to: "/reels", icon: reels, label: "Reels" },
    { to: "/notifications", icon: notifications, label: "Notifications" },
    { to: "/create", icon: create, activeIcon: activeCreate, label: "Create" },
  ];

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link className="flex gap-3 items-center" to="/">
          <img
            className="w-44"
            src={instagramLogoLetter}
            alt="Instagram logo"
          />
        </Link>

        {navLinks.map(({ to, icon, activeIcon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex gap-3 transition-all duration-300 items-center ${
                isActive ? "font-bold" : ""
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive && activeIcon ? activeIcon : icon}
                  alt={label}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}

        <NavLink
          to={`/profile/${user.id}`}
          className={({ isActive }) =>
            `flex gap-3 items-center ${isActive ? "font-bold" : ""}`
          }
        >
          <img
            className="size-6 rounded-full"
            src={user.imageUrl || avatar}
            alt="profile avatar"
          />{" "}
          Profile
        </NavLink>
      </div>

      <Button
        onClick={() => {
          signOut();
          navigate("/accounts/sign-in");
        }}
        variant="ghost"
        className="mt-auto"
      >
        Logout
      </Button>

      <Link to="/more" className="flex gap-3 items-center">
        <img src={more} alt="settings" /> More
      </Link>
    </nav>
  );
};

export default LeftSidebar;
