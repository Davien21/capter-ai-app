import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import styles from "./verify-email.module.scss";

import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import {
  AuthTopIllustraion,
  LogoIcon,
  MailIcon,
  Star5Icon,
  StarIcon,
} from "assets/images";
import { CloudinaryImage } from "components/common/CloudinaryImage";
import { useState } from "react";
import { sendOtp, verifyOtp } from "services/authService";
import { handleAxiosError } from "utilities/helpers";
import { AxiosError } from "axios";
import { IAPIResponse, IComponentState, IHTTPErrorResponse } from "interfaces";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getServerErrorObject } from "utilities/server-error-middleware";
import { OtpInput } from "components/ui/OTPInput";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const formSchema = z.object({
  otp: z.string().min(4, {
    message: "OTP must be at least 4 characters.",
  }),
});

export default function VerifyEmailPage() {
  const [isLoading, setisLoading] = useState(false);
  const [isResendingOtp, setisResendingOtp] = useState(false);
  const [otpState, setotpState] = useState<IComponentState>("idle");
  const router = useRouter();
  const email = router.query.email as string;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const handleResendOtp = async () => {
    try {
      if (!email) return;
      setisResendingOtp(true);
      await sendOtp({ email });
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      setisLoading(true);
      await verifyOtp({ email: email, otp: values.otp });
      toast.success("Verification successful, logging in...", {
        duration: 3000,
        onDismiss: () => router.push(`/`),
        onAutoClose: () => router.push(`/`),
      });
    } catch (error) {
      const axiosError = error as AxiosError<IAPIResponse<any>>;
      handleAxiosError(axiosError);
    } finally {
      setisLoading(false);
    }
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
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-5"
                  >
                    <OtpInput
                      otp={form.getValues("otp")}
                      state={otpState}
                      onOtpChange={(value) => {
                        form.setValue("otp", value);
                        form.trigger("otp");
                        setotpState("idle");
                      }}
                      allowOnlyNumbers={true}
                    />
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      disabled={!form.formState.isValid}
                    >
                      Verify email
                    </Button>
                  </form>
                </Form>
                <div className="flex gap-1 text-sm justify-center items-center mb-6">
                  <p className="font-normal text-muted">
                    Didn’t receive the email?
                  </p>
                  <Button
                    variant={"link"}
                    onClick={handleResendOtp}
                    isLoading={isResendingOtp}
                  >
                    {isResendingOtp ? "Resending" : "Click to resend"}
                  </Button>
                </div>
                <div className="flex justify-center gap-2">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const email = context.query.email as string;

    // await AllowOnlyUnverifiedUser(email);

    //
    return {
      props: {},
    };
  } catch (error) {
    const httpError = error as IHTTPErrorResponse;
    console.log(httpError);

    return await getServerErrorObject(httpError.status);
  }
};
