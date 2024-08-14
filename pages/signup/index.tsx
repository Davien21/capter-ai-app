import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "./signup.module.scss";

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
import { useState } from "react";
import { SignupUser } from "services/authService";
import { handleAxiosError } from "utilities/helpers";
import { AxiosError } from "axios";
import { IAPIResponse } from "interfaces";
import { toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function SignupForm() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setisLoading(true);
      await SignupUser(values);
      let encodedEmail = encodeURIComponent(values.email);
      let route = `/verify-email?email=${encodedEmail}`;
      toast.success("Account created successfully", {
        duration: 700,
        onDismiss: () => router.push(route),
        onAutoClose: () => router.push(route),
      });
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
    <main className={`min-h-dvh ${styles["container"]}`}>
      <section className="h-full">
        <div className="min-h-dvh lg:grid grid-cols-2 max-w-[1800px] mx-auto">
          <div className="container flex flex-col sm:min-h-dvh">
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
                    Sign up
                  </p>
                  <p className="font-normal text-muted mb-8">
                    Create your free Capter account
                  </p>
                  <GoogleButton className="w-full" text="Sign up with Google" />
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter your name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      Create Account
                    </Button>
                  </form>
                </Form>
                <div className="mt-8 flex gap-1 text-sm justify-center items-center">
                  <p className="font-normal text-muted">
                    Already have an account?
                  </p>
                  <Button variant={"link"} href="/login">
                    Log in
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
