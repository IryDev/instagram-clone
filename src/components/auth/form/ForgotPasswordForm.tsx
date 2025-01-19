import lock from "@/assets/icons/lock.png";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { account } from "@/lib/appwrite/config";
import { forgotPasswordSchema } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

import { useCheckEmailExists } from "@/lib/react-query/queriesAndMutations";

const ForgotPasswordForm = () => {
  const { toast } = useToast();

  const { mutateAsync: checkEmailExists, isPending: isChecking } =
    useCheckEmailExists();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function sendEmailRecovery(email: string) {
    return account.createRecovery(
      email,
      "http://localhost:5173/accounts/reset-password"
    );
  }

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    try {
      const userEmailExists = await checkEmailExists(data.email);

      if (userEmailExists) {
        await sendEmailRecovery(data.email);
        toast({
          title: "Email sent",
          description: "Check your email to reset your password",
        });
      } else {
        toast({
          title: "No user found",
          description: "User with this email does not exist",
          action: <ToastAction altText="Retry">Retry</ToastAction>,
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "There was an error sending the email",
      });
    }
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

      <div className="mt-20 max-w-[350px] mx-auto w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="md:border border-gray-300 dark:border-[#363636] w-full md:max-w-[388px] md:w-[388px]"
          >
            <img
              className="mx-auto dark:invert my-6"
              width={90}
              height={90}
              src={lock}
              alt=""
            />

            <h1 className="text-center font-semibold text-lg dark:text-[#F5F5F5]">
              Trouble logging in ?
            </h1>

            <p className="text-center text-sm dark:text-[#A8A8A8] px-12 my-3">
              Enter your email, phone, or username and we'll send you a link to
              get back into your account.
            </p>

            <div className="px-12 mb-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputLabelFloating
                        label="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="px-12">
              <Button
                loading={form.formState.isSubmitting || isChecking}
                disabled={!form.formState.isValid}
                type="submit"
                className="w-full py-0 h-8 bg-[#0095F6] hover:bg-[#1877f2] text-white rounded"
              >
                Send login link
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 mb-4 px-12">
              <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
              <div className="text-sm text-black font-medium dark:text-[#cfd9de] uppercase">
                or
              </div>
              <div className="h-[1px] w-full bg-[#DBDBDB] dark:bg-[#2f3336]"></div>
            </div>

            <Link
              to="/accounts/sign-up"
              className="w-full hover:text-[#00376B] dark:hover:text-white flex items-center justify-center gap-2"
            >
              Create new account
            </Link>

            <div className="text-center w-full bg-[#FAFAFA] dark:bg-[#121212] border dark:border-[#262626] border-[#DBDBDB] py-2 !mt-20">
              <Link
                to="/accounts/sign-in"
                className="w-full block dark:text-[#FAFAFA] text-sm mx-auto"
              >
                Back to login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
