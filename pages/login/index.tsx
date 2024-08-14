import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "./login.module.scss";

import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { GoogleButton } from "components/ui/GoogleButton";
import {
  AuthTopIllustraion,
  LogoIcon,
  Star5Icon,
  StarIcon,
} from "assets/images";
import { CloudinaryImage } from "components/common/CloudinaryImage";
import { useEffect, useState } from "react";
import { LoginUser } from "services/authService";
import { handleAxiosError } from "utilities/helpers";
import { AxiosError } from "axios";
import { IAPIResponse } from "interfaces";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginForm() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const wasUnauthorized = router.query?.reason === "unauthorized";

  useEffect(() => {
    if (wasUnauthorized) {
      toast.error("You were logged out.");
      const url = `/login`;
      const oldState = window.history.state;

      window.history.replaceState({ ...oldState, as: url, url }, "", url);
    }
  }, [wasUnauthorized]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setisLoading(true);
      await LoginUser(values);
      router.push(`/`);
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      handleAxiosError(axiosError);
    } finally {
      setisLoading(false);
    }
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className={`min-h-screen ${styles["container"]}`}>
      <section className="h-full">
        <div className="min-h-screen lg:grid grid-cols-2 max-w-[1800px] mx-auto">
          <div className="container flex flex-col sm:min-h-screen">
            <div className="relative mb-8 flex justify-center">
              <span className="hidden sm:flex absolute -z-10 top-[-80px] 2xl:top-[initial]">
                <AuthTopIllustraion />
              </span>
            </div>
            <Link href={`/`}>
              <a className="pt-4 2xl:p-10 mt-[-32px]">
                <LogoIcon />
              </a>
            </Link>
            <div className="flex items-center justify-center flex-1">
              <div className="w-[360px] sm:mt-[-40px] xl:mt-[-120px] mt-8">
                <Form {...form}>
                  <p className="text-2xl sm:text-4xl font-semibold mb-3">
                    Welcome back
                  </p>
                  <p className="font-normal text-muted mb-8">
                    Login to continue writing
                  </p>
                  <GoogleButton
                    className="w-full"
                    text="Continue with Google"
                  />
                  <div className="relative mt-4 mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted">OR</span>
                    </div>
                  </div>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your email" {...field} />
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
                          <FormLabel>Password*</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      disabled={!form.formState.isValid}
                    >
                      Login
                    </Button>
                  </form>
                </Form>
                <div className="text-center mt-8">
                  <Button variant={"link"} href="/forgot-password">
                    Forgot Password?
                  </Button>
                </div>
                <div className="flex gap-1 text-sm justify-center items-center">
                  <p className="font-normal text-muted">
                    Don’t have an account?
                  </p>
                  <Button variant={"link"} href="/signup">
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block py-4 pr-4 h-full">
            <div
              className={`bg-primary h-full rounded-xl ${styles["right-section"]}`}
            >
              <div className="px-16 py-8 2xl:px-24 xl:py-16 flex flex-col justify-end">
                <StarIcon />
                <h1 className={`text-6xl text-white mb-4 mt-8`}>
                  Start turning your ideas into reality.
                </h1>
                <p className="text-lg text-white mb-8">
                  Create a free account and get full access to all features for
                  30-days. No credit card needed. Get started in 2 minutes.
                </p>
                <div className="flex gap-x-4 items-center">
                  <div className="flex">
                    <CloudinaryImage
                      width={156}
                      height={44}
                      quality={100}
                      src="https://res.cloudinary.com/capterai/image/upload/v1706269668/Avatar_group_hhiker.png"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex gap-2">
                      <div className="flex gap-x-1">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Star5Icon key={item} />
                        ))}
                      </div>
                      <span className="text-white text-base font-semibold">
                        5.0
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-base">
                        from 200+ reviewers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
