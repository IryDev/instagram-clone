import facebookWhite from "@/assets/icons/facebook-white.svg";
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
import { images } from "@/constants/images";
import { useUserContext } from "@/context/AuthContext";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { signupSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } =
    useSignInAccount();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (user: z.infer<typeof signupSchema>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({
          title: "Error",
          description: "Sign up failed. Please try again.",
          variant: "error",
        });

        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({
          title: "Error",
          description: "Something went wrong. Please login your new account",
          variant: "error",
        });

        navigate("/accounts/sign-in");

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "error",
        });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="mt-3 max-w-[350px] mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-4 pt-12 px-10 sm:border border-gray-300 dark:border-[#363636] max-w-[350px] w-[350px]"
        >
          <img
            className="mx-auto dark:invert"
            width={180}
            src={images.instagramLogoLetter.src}
            alt={images.instagramLogoLetter.alt}
          />

          <h1 className="text-center font-semibold text-base text-gray-500 mt-3 leading-5 dark:text-[#A8A8A8]">
            Sign up to see photos and videos from your friends.
          </h1>

          <Button className="w-full bg-[#0095F2] hover:bg-[#1877f2] my-3 h-8 text-white rounded flex items-center gap-2">
            <img
              className="w-5 h-5 inline-block mr-2 text-medium"
              src={facebookWhite}
              alt=""
            />
            Log in with Facebook
          </Button>

          <div className="flex items-center justify-center gap-6 my-2">
            <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
            <div className="text-sm text-gray-500 font-medium dark:text-[#cfd9de] uppercase">
              or
            </div>
            <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
          </div>

          <div className="flex gap-2 flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabelFloating
                      label="Email"
                      className={`${
                        form.formState.errors.email ? "border-red-500" : ""
                      } dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]`}
                      // className="dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]"
                      type="email"
                      {...field}
                    />
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
                      // className="dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]"
                      className={`${
                        form.formState.errors.password ? "border-red-500" : ""
                      } dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]`}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabelFloating
                      label="Name"
                      className={`${
                        form.formState.errors.name ? "border-red-500" : ""
                      } dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputLabelFloating
                      label="Username"
                      className={`${
                        form.formState.errors.username ? "border-red-500" : ""
                      } dark:bg-[#121212] dark:border-[#555555] dark:placeholder:text-[#a8a8a8]`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-[#A8A8A8] mt-4">
              People who use our service may have uploaded your contact
              information to Instagram.{" "}
              <a
                target="_blank"
                className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
                href="https://www.facebook.com/help/instagram/261704639352628"
              >
                Learn More
              </a>
            </p>

            <p className="mt-6 text-xs text-[#A8A8A8]">
              By signing up, you agree to our{" "}
              <a
                target="_blank"
                className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
                href="https://www.facebook.com/help/instagram/261704639352628"
              >
                Tearms
              </a>
              . Learn how we collect, use and share your data in our{" "}
              <a
                target="_blank"
                className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
                href="https://www.facebook.com/privacy/policy"
              >
                Privacy Policy
              </a>
              and how we use cookies and similar technology in our{" "}
              <a
                target="_blank"
                className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
                href="https://privacycenter.instagram.com/policies/cookies/"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          <Button
            disabled={!form.formState.isValid}
            loading={isCreatingUser || isSigningIn || isUserLoading}
            type="submit"
            className="w-full bg-[#0095F2] h-8 hover:bg-[#1877f2] my-3 py-1 text-white rounded"
          >
            Sign Up
          </Button>

          <p className="text-xs text-center text-[#A8A8A8] mt-6">
            You can also{" "}
            <a
              target="_blank"
              className="text-[#00376B] dark:text-[#E0F1FF] hover:underline"
              href="https://help.instagram.com/contact/406206379945942/?locale=en_US&Defamation_CF_redirect=%7B%22URLs1%22%3A%22%22%2C%22gb_country%22%3A%22France%22%7D&Erasure_Redirect=%7B%22erasure_cf_redirect%22%3A%22%7B%5C%22Jurisdiction%5C%22%3A%5C%22France%5C%22%2C%5C%22URLs%5C%22%3A%5C%22%5C%22%7D%22%2C%22ipr_cf_redirect%22%3A%22%7B%5C%22content_url%5C%22%3A%5C%22%5C%22%2C%5C%22crtformredirect%5C%22%3A%5C%22%7B%5C%5C%5C%22content_url%5C%5C%5C%22%3A%5C%5C%5C%22%5C%5C%5C%22%2C%5C%5C%5C%22crtformredirect%5C%5C%5C%22%3A%5C%5C%5C%22%7B%5C%5C%5C%5C%5C%5C%5C%22content_url%5C%5C%5C%5C%5C%5C%5C%22%3A%5C%5C%5C%5C%5C%5C%5C%22%5C%5C%5C%5C%5C%5C%5C%22%2C%5C%5C%5C%5C%5C%5C%5C%22whatcountry%5C%5C%5C%5C%5C%5C%5C%22%3A%5C%5C%5C%5C%5C%5C%5C%22France%5C%5C%5C%5C%5C%5C%5C%22%7D%5C%5C%5C%22%2C%5C%5C%5C%22whatcountry%5C%5C%5C%22%3A%5C%5C%5C%22France%5C%5C%5C%22%7D%5C%22%7D%22%7D&French_IG_LRRP_redirect=%7B%22URLs1%22%3A%22%22%7D&IP_CF_redirect=%7B%22submit_copyright_report%22%3A%22%7B%5C%22content_urls%5C%22%3A%5C%22%5C%22%7D%22%2C%22submit_tm_report%22%3A%22%7B%5C%22content_urls%5C%22%3A%5C%22%5C%22%2C%5C%22counterfeitredirect%5C%22%3A%5C%22%7B%5C%5C%5C%22content_urls%5C%5C%5C%22%3A%5C%5C%5C%22%5C%5C%5C%22%7D%5C%22%7D%22%7D&LOBComment3=&URLs1"
            >
              report content you believe is unlawful
            </a>{" "}
            in your country without logging in.
          </p>
        </form>
      </Form>

      <div className="sm:border p-4 border-gray-300 mt-4 dark:border-[#363636]">
        <p className="text-sm text-center">
          Have an account?{" "}
          <Link to="/accounts/sign-in" className="text-blue-500">
            Log in
          </Link>
        </p>
      </div>

      <p className="text-center my-4 dark:text-[#F5F5F5]">Get the app.</p>

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
  );
};

export default SignupForm;
