import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "./forgot-password.module.scss";

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
import {
  AuthTopIllustraion,
  LockIcon,
  LogoIcon,
  MailIcon,
  Star5Icon,
  StarIcon,
} from "assets/images";
import { CloudinaryImage } from "components/common/CloudinaryImage";
import { useState } from "react";
import {
  ResetPassword,
  sendPasswordOtp,
  verifyPasswordOtp,
} from "services/authService";
import { handleAxiosError } from "utilities/helpers";
import { AxiosError } from "axios";
import { IAPIResponse, IComponentState } from "interfaces";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { OtpInput } from "components/ui/OTPInput";
import Link from "next/link";

type IPosition = "email" | "otp" | "reset-password";

const emailSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
});

const otpSchema = z.object({
  otp: z.string().min(4, {
    message: "OTP must be at least 4 characters.",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function ForgotPasswordForm() {
  const [position, setposition] = useState<IPosition>("email");

  const [isSendingOtp, setisSendingOtp] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const email = emailForm.watch("email");

  async function onSubmitEmail(values: z.infer<typeof emailSchema>) {
    try {
      setisSendingOtp(true);
      console.log(values);
      await sendPasswordOtp({ email: values.email });
      setposition("otp");
      toast.success("Code sent successfully");
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      handleAxiosError(axiosError);
    } finally {
      setisSendingOtp(false);
    }
    console.log(values);
  }

  const [isSubmittingOtp, setisSubmittingOtp] = useState(false);
  const [isResendingOtp, setisResendingOtp] = useState(false);
  const [otpState, setotpState] = useState<IComponentState>("idle");

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmitOTP(values: z.infer<typeof otpSchema>) {
    console.log(values);
    try {
      setisSubmittingOtp(true);
      await verifyPasswordOtp({ email: email, otp: values.otp });
      toast.success("You can now reset your password.");
      setposition("reset-password");
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      handleAxiosError(axiosError);
    } finally {
      setisSubmittingOtp(false);
    }
  }

  const handleResendOtp = async () => {
    try {
      if (!email) return;
      setisResendingOtp(true);
      await sendPasswordOtp({ email });
      toast.success("Code resent successfully");
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      const message = axiosError.response?.data.message;
      if (!message) return;
      toast.error(message);
    } finally {
      setisResendingOtp(false);
    }
  };

  const router = useRouter();
  const [isResetting, setisResetting] = useState(false);

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmitPassword = async (
    values: z.infer<typeof resetPasswordSchema>
  ) => {
    try {
      setisResetting(true);
      await ResetPassword({
        email,
        password: values.password,
        otp: otpForm.getValues("otp"),
      });
      toast.success("Password reset successfully", {
        duration: 1000,
        onDismiss: () => router.push(`/login`),
        onAutoClose: () => router.push(`/login`),
      });
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      handleAxiosError(axiosError);
    } finally {
      setisResetting(false);
    }
  };

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
              <div
                key={position}
                className="w-[360px] sm:mt-[-40px] xl:mt-[-120px] mt-8 "
              >
                <div className="animate-in fade-in-30 duration-1000">
                  {position === "email" && (
                    <Form {...emailForm}>
                      <div className="mb-6 flex justify-center">
                        <LockIcon />
                      </div>
                      <p className="text-center text-2xl sm:text-4xl font-semibold mb-3">
                        Forgot Password
                      </p>
                      <p className="text-center font-normal text-muted mb-8">
                        Enter the email address associated with your account
                      </p>
                      <form
                        onSubmit={emailForm.handleSubmit(onSubmitEmail)}
                        className="flex flex-col gap-y-5"
                      >
                        <FormField
                          control={emailForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          isLoading={isSendingOtp}
                          type="submit"
                          disabled={!emailForm.formState.isValid}
                        >
                          Continue
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
                <div className="animate-in fade-in-30 duration-1000">
                  {position === "otp" && (
                    <Form {...otpForm}>
                      <span className="text-center flex justify-center mb-6 relative z-10">
                        <MailIcon />
                      </span>
                      <p className="text-2xl sm:text-4xl font-semibold mb-3 text-center">
                        Check your mail
                      </p>
                      <p className="font-normal text-muted mb-8 text-center">
                        <span className="">We sent a code to </span>
                        {email && <span className="font-bold">{email}</span>}
                      </p>
                      <form
                        onSubmit={otpForm.handleSubmit(onSubmitOTP)}
                        className="flex flex-col gap-y-5"
                      >
                        <OtpInput
                          otp={otpForm.getValues("otp")}
                          state={otpState}
                          onOtpChange={(value) => {
                            otpForm.setValue("otp", value);
                            otpForm.trigger("otp");
                            setotpState("idle");
                          }}
                          allowOnlyNumbers={true}
                        />
                        <Button
                          isLoading={isSubmittingOtp}
                          type="submit"
                          disabled={!otpForm.formState.isValid}
                        >
                          Verify email
                        </Button>
                        <div className="flex gap-1 text-sm justify-center items-center mb-6">
                          <p className="font-normal text-muted">
                            Didn’t receive the email?
                          </p>
                          <Button
                            variant={"link"}
                            type="button"
                            onClick={handleResendOtp}
                            isLoading={isResendingOtp}
                          >
                            {isResendingOtp ? "Resending" : "Click to resend"}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </div>
                <div className="animate-in fade-in-30 duration-1000">
                  {position === "reset-password" && (
                    <Form {...resetPasswordForm}>
                      <div className="mb-6 flex justify-center">
                        <LockIcon />
                      </div>
                      <p className="text-center text-2xl sm:text-4xl font-semibold mb-3">
                        Reset Password
                      </p>
                      <p className="text-center font-normal text-muted mb-8">
                        Create a new password for your Capter AI account
                      </p>
                      <form
                        onSubmit={resetPasswordForm.handleSubmit(
                          onSubmitPassword
                        )}
                        className="flex flex-col gap-y-5"
                      >
                        <FormField
                          control={resetPasswordForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password*</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Create a new password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          isLoading={isResetting}
                          type="submit"
                          disabled={!resetPasswordForm.formState.isValid}
                        >
                          Reset Password
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
                <div className="flex justify-center mt-8 gap-2">
                  <Button
                    variant={"link"}
                    className="gap-1 text-muted"
                    href="/login"
                  >
                    <ArrowLeftIcon width={20} height={20} />
                    <span>Back to login</span>
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

function OTPForm() {
  return <></>;
}
