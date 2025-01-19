import instagramLogoLetter from "@/assets/images/instagram.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputLabelFloating } from "@/components/ui/input-label-floating";
import { toast } from "@/components/ui/use-toast";
import { account } from "@/lib/appwrite/config";
import { resetPasswordSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import NotFoundAuth from "../NotFound";

const ResetPasswordForm = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const { secret, userId } = Object.fromEntries(urlParams.entries());

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function updatePassword(password: string, userId: string, secret: string) {
    return account.updateRecovery(userId, secret, password);
  }

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      await updatePassword(data.password, userId, secret);

      return toast({
        title: "Password updated",
        description: "Your password has been updated",
        variant: "success",
      });
    } catch {
      console.log("Error");

      return toast({
        title: "Error",
        description: "There was an error updating your password",
        variant: "error",
      });
    }
  }

  if (!secret || !userId) {
    return (
      <>
        <NotFoundAuth />
      </>
    );
  }

  return (
    <>
      <div className="border-b border-[#DBDBDB] bg-white dark:bg-black fixed top-0 dark:border-[#2f3336] w-full p-2 py-3 flex aling-center justify-center">
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
              className="text-[#0095F6] text-sm mt-10 mx-auto font-bold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-44 max-w-[360px] mx-auto w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="border border-gray-300 dark:border-[#363636] max-w-[360px] w-[360px] px-10"
          >
            <h1 className="text-center font-bold mb-5 mt-12">
              Create a strong password
            </h1>

            <p className="text-center text-sm dark:text-[#A8A8A8] my-3 mb-9">
              Your password must be at least 6 characters and should include a
              combination of numbers, letters and special characters (!$@%).
            </p>

            <div className="mb-8">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputLabelFloating
                        type="password"
                        label="New password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" mb-4">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputLabelFloating
                        type="password"
                        label="New password, again"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-14 mb-14">
              <Button
                type="submit"
                className="w-full h-8 bg-[#0095F6] hover:bg-[#1877f2] text-white rounded"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
