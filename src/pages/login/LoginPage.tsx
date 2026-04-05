import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constant/routes";
import { useAuth } from "@/axios/AuthContext";
import { getApiErrorMessages } from "@/lib/error";
import { toastError } from "@/lib/toast";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  username: string;
  password: string;
};

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleLogin = async (data: LoginFormValues) => {
    const { username, password } = data;

    try {
      await login({ username, password });
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      const messages = getApiErrorMessages(error);
      messages.forEach((m) => toastError(m));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-indigo-950/30 dark:to-slate-950" />
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-400/10" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
      </div>

      {/* Brand */}
      <div className="absolute top-8 left-8">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          BankDash
          <span className="text-primary">.</span>
        </Link>
      </div>

      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">
              Login to your account
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Welcome back! Please enter your details.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth */}
            <Button
              type="button"
              variant="outline"
              className="w-full bg-background/60"
              onClick={() => {
                // TODO: integrate Google OAuth
              }}
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M21.35 11.1H12v2.9h5.35c-.23 1.32-1.5 3.87-5.35 3.87-3.22 0-5.85-2.66-5.85-5.87S8.78 6.13 12 6.13c1.84 0 3.07.78 3.78 1.45l2.57-2.46C16.79 3.69 14.62 2.7 12 2.7 6.9 2.7 2.77 6.86 2.77 12s4.13 9.3 9.23 9.3c5.33 0 8.86-3.76 8.86-9.05 0-.61-.06-1.07-.14-1.55Z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  placeholder="balamia@gmail.com"
                  autoComplete="username"
                  // aria-invalid={!!errors.username}
                />
                {errors.username?.message && (
                  <p className="text-sm text-destructive flex flex-left">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="ml-auto text-sm text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    // aria-invalid={!!errors.password}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password?.message && (
                  <p className="text-sm text-destructive flex flex-left">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login now"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to={ROUTES.SIGN_UP}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
