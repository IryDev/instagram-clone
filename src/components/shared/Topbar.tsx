import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import avatar from "@/assets/icons/profile-placeholder.svg";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate("/accounts/sign-in");
    }
  }, [isSuccess, navigate]);

  return (
    <section className="topbar">
      <div className="flex items-center justify-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          React Router v6
        </Link>

        <div className="flex gap-4">
          <Button onClick={() => signOut()} variant="ghost">
            Logout
          </Button>

          <Link to={`/profile/${user.id}`} className="flex items-center justify-center gap-3">
            <img className="size-8 rounded-full" src={user.imageUrl || avatar} alt="profile avatar" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
