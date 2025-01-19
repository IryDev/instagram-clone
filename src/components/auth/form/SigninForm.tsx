
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputLabelFloating } from "@/components/ui/input-label-floating";
import { useToast } from "@/components/ui/use-toast";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useUserContext } from "@/context/AuthContext";
import { signInWithFacebook } from "@/lib/appwrite/api";
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations";
import { loginSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const SigninForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  // swith between opacity of the screenshots
  const [currentScreen, setCurrentScreen] = useState(1);

  // switch between screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev === 3 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const { mutateAsync: signInAccount, isPending: isSigning } =
    useSignInAccount();

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    const session = await signInAccount({
      email: data.email,
      password: data.password,
    });

    if (!session) {
      return toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "error",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/");
    } else {
      return toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "error",
      });
    }
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignInWithFacebook = async () => {
    // handle sign in with facebook
    alert("Sign in with Facebook");

    try {
      await signInWithFacebook();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to sign in with Facebook",
        variant: "error",
      });
    }
  };

  return (
    <div className="flex items-stretch justify-center h-full">
      <div className="mr-8 mb-3 h-[582px] w-[380px] self-center phones hidden md:flex">
        <div className="mt-[27px] ml-[112px]">
          <img
            className={`w-[250px] h-[538px] absolute duration-1000 ${
              currentScreen === 1 ? "opacity-100" : "opacity-0 z-10"
            }`}
            src={images.screenShot.src}
            alt={images.screenShot.alt}
          />
          <img
            className={`w-[250px] h-[538px] absolute duration-1000 ${
              currentScreen === 2 ? "opacity-100" : "opacity-0"
            }`}
            src={images.screenShot2.src}
            alt={images.screenShot2.alt}
          />
          <img
            className={`w-[250px] h-[538px] absolute duration-1000 ${
              currentScreen === 3 ? "opacity-100" : "opacity-0"
            }`}
            src={images.screenShot3.src}
            alt={images.screenShot3.alt}
          />
        </div>
      </div>
      <div className="mt-10 max-w-[350px] mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-4 px-10 pt-12 space-y-4 sm:border border-gray-300 dark:border-[#363636] max-w-[350px] w-[350px]"
          >
            <img
              className="mx-auto dark:invert mb-10"
              width={180}
              src={images.instagramLogoLetter.src}
              alt={images.instagramLogoLetter.alt}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabelFloating label="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabelFloating
                      label="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              // button is disabled if all fields are correct
              disabled={!form.formState.isValid}
              loading={isSigning || isUserLoading}
              type="submit"
              className="w-full h-8 bg-[#0095F2] hover:bg-[#1877f2] text-white rounded"
            >
              Log In
            </Button>

            <div className="flex items-center justify-center gap-6 my-12">
              <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
              <div className="text-sm text-gray-500 font-semibold dark:text-[#cfd9de] uppercase">
                or
              </div>
              <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
            </div>

            <button
              onClick={() => handleSignInWithFacebook()}
              className="w-full text-sm font-semibold text-[#0095f6] hover:text-[#00376B] dark:hover:text-white flex items-center justify-center gap-2"
            >
              <img width={25} src={icons.facebook} alt="" />
              Log in with Facebook
            </button>

            <div className="text-center">
              <Link
                to="/accounts/forgot-password"
                className="text-[#00376B] dark:text-[#E0F1FF] text-sm mt-10 mx-auto"
              >
                Forgot Password ?
              </Link>
            </div>

            <div className="text-center">
              <p className="text-xs text-[#A8A8A8]">
                You can also{" "}
                <a
                  className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
                  target="_blank"
                  href="https://help.instagram.com/contact/406206379945942/?locale=en_US&Defamation_CF_redirect=%7B%22URLs1%22%3A%22%22%2C%22gb_country%22%3A%22France%22%7D&Erasure_Redirect=%7B%22erasure_cf_redirect%22%3A%22%7B%5C%22Jurisdiction%5C%22%3A%5C%22France%5C%22%2C%5C%22URLs%5C%22%3A%5C%22%5C%22%7D%22%2C%22ipr_cf_redirect%22%3A%22%7B%5C%22content_url%5C%22%3A%5C%22%5C%22%2C%5C%22crtformredirect%5C%22%3A%5C%22%7B%5C%5C%5C%22content_url%5C%5C%5C%22%3A%5C%5C%5C%22%5C%5C%5C%22%2C%5C%5C%5C%22crtformredirect%5C%5C%5C%22%3A%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22content_url%5C%5C%5C%5C%5C%5C%5C%22%3A%5C%5C%5C%5C%5C%5C%5C%22%5C%5C%5C%5C%5C%5C%5C%22%2C%5C%5C%5C%5C%5C%5C%5C%22whatcountry%5C%5C%5C%5C%5C%5C%5C%22%3A%5C%5C%5C%5C%5C%5C%5C%22France%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%2C%5C%5C%5C%22whatcountry%5C%5C%5C%22%3A%5C%5C%5C%22France%5C%5C%5C%22%7D%5C%22%7D%22%7D&French_IG_LRRP_redirect=%7B%22URLs1%22%3A%22%22%7D&IP_CF_redirect=%7B%22submit_copyright_report%22%3A%22%7B%5C%22content_urls%5C%22%3A%5C%22%5C%22%7D%22%2C%22submit_tm_report%22%3A%22%7B%5C%22content_urls%5C%22%3A%5C%22%5C%22%2C%5C%22counterfeitredirect%5C%22%3A%5C%22%7B%5C%5C%5C%22content_urls%5C%5C%5C%22%3A%5C%5C%5C%22%5C%5C%5C%22%7D%5C%22%7D%22%7D&LOBComment3=&URLs1"
                >
                  report content you believe is unlawful
                </a>{" "}
                in your country without logging in.
              </p>
            </div>
          </form>
        </Form>

        <div className="sm:border p-4 border-gray-300 mt-4 dark:border-[#363636]">
          <p className="text-sm text-center">
            Don't have an account ?{" "}
            <Link to="/accounts/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center my-4 dark:text-[#F5F5F5] text-sm">
          Get the app.
        </p>

        <div className="flex gap-2 mt-4 justify-center items-center">
          <a
            target="_blank"
            href="https://apps.apple.com/us/app/instagram/id389801252"
          >
            <img
              className="w-36"
              src={images.appStore.src}
              alt={images.appStore.alt}
            />
          </a>

          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.instagram.android"
          >
            <img
              className="w-36"
              src={images.googlePlay.src}
              alt={images.googlePlay.alt}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
