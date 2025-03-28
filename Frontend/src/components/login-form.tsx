import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/lib/fetchdata/userApi";
import { useState } from "react";
import FrontImage from "@/assets/sign-login-blog.png";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userDetail, setUserDetail] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const [hide, setHide] = useState<boolean>(true);

  const { mutateAsync: login, isPending } = useMutation({
    mutationFn: userLogin,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your ZOB account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={userDetail.username}
                  onChange={(e) =>
                    setUserDetail((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot"
                    className="ml-auto text-[12px] underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={hide ? "password" : "text"}
                      placeholder="Enter Password"
                      value={userDetail.password}
                      className="pr-[34px]"
                      onChange={(e) =>
                        setUserDetail((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                    />
                    <div className="absolute top-[10px] right-[15px] cursor-pointer">
                      {hide ? (
                        <Eye size={18} onClick={() => setHide(false)} />
                      ) : (
                        <EyeOff size={18} onClick={() => setHide(true)} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                type="button"
                className="w-full select-none"
                onClick={async () => {
                  const data = await login(userDetail);
                  if (data?.error) {
                    // console.log(await data);
                    toast("Error", {
                      description: data?.error,
                    });
                    return;
                  }
                  localStorage.setItem("user", JSON.stringify(data));
                  // console.log(await data);
                  toast("User Login", {
                    description: "User Login Successfully",
                  });
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 1000);
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" />{" "}
                    <span>Please Wait</span>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  toast("User Login", {
                    description:
                      "Sorry! Google Login is not Available Right Now. We are working on it. We are requesting you to Signup.",
                  })
                }
              >
                Login with Google
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={"/signup"} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={FrontImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
