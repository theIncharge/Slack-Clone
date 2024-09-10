import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}
const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const onProviderSignUp = (value: "github" | "google") => {
    {
      setPending(true);
      signIn(value).finally(() => {
        setPending(false);
      });
    }
  };
  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }
    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => "Something went wrong")
      .finally(() => {
        setPending(false);
      });
  };
  return (
    <Card className="w-full h-full p-8 ">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up To Continue</CardTitle>
        <CardDescription>
          Use Your Email or another service Sign Up continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="name"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="confirm password"
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => {
              onProviderSignUp("google");
            }}
            variant="outline"
            className="relative"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" /> Continue
            with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => {
              onProviderSignUp("github");
            }}
            variant="outline"
            className="relative"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" /> Continue
            with Github
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an Account{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
