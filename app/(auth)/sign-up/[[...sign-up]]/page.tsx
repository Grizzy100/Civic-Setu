"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { userSignUpschema, SignUpFormData } from "@/schema/userSignUpschema";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(userSignUpschema),
  });

  if (!isLoaded || !signUp) return <div>Loading...</div>;

  // -------------------- Sign Up --------------------
  const onSubmit = async (data: SignUpFormData) => {
    setIsSubmitting(true);
    setAuthError(null);

    try {
      console.log("Submitting form:", data);

      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      console.log("SignUp result:", result);

      if (result.status === "complete") {
        // If Clerk auto-creates session, this works
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
        }
        router.push("/location");
      } else if (result.status === "needs_verification") {
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        setVerifying(true);
      } else {
        setAuthError("Unexpected sign-up status: " + result.status);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError(err.errors?.[0]?.longMessage || err.message || "Sign-up failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------- Verification --------------------
  const handleVerificationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerificationError(null);
    setIsSubmitting(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verificationCode });
      console.log("Verification result:", result);

      if (result.status === "complete") {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
        }
        router.push("/location");
      } else {
        setVerificationError("Verification could not be completed. Try again.");
      }
    } catch (err: any) {
      console.error(err);
      setVerificationError(err.errors?.[0]?.longMessage || err.message || "Verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------- Verification Form --------------------
  if (verifying) {
    return (
      <Card className="w-full max-w-md mx-auto mt-16">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-bold">Verify Your Email</h2>
          <p className="text-gray-500 text-sm mt-1">We've sent a verification code to your email</p>
        </CardHeader>

        <Divider />

        <CardBody className="space-y-4">
          {verificationError && (
            <div className="bg-red-50 text-red-700 p-3 rounded flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {verificationError}
            </div>
          )}

          <form onSubmit={handleVerificationSubmit} className="space-y-4">
            <Input
              placeholder="6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              autoFocus
              className="text-center tracking-widest"
            />
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </form>

          <div className="text-center text-sm mt-2">
            Didn't receive a code?{" "}
            <button
              className="text-blue-500 hover:underline"
              onClick={async () => {
                if (signUp) await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
              }}
            >
              Resend
            </button>
          </div>
        </CardBody>
      </Card>
    );
  }

  // -------------------- Sign Up Form --------------------
  return (
    <Card className="w-full max-w-md mx-auto mt-16">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Create Your Account</h2>
        <p className="text-gray-500 text-sm mt-1">Sign up to continue</p>
      </CardHeader>

      <Divider />

      <CardBody className="space-y-4">
        {authError && (
          <div className="bg-red-50 text-red-700 p-3 rounded flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Email"
            {...register("email")}
            startContent={<Mail className="w-4 h-4 text-gray-400" />}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            startContent={<Lock className="w-4 h-4 text-gray-400" />}
            endContent={
              <Button
                isIconOnly
                variant="light"
                size="sm"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            }
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </CardBody>

      <Divider />

      <CardFooter className="text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
