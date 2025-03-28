import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "@/lib/fetchdata/userApi";

export function ForgotForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [userDetail, setUserDetail] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  const [hide, setHide] = useState<boolean>(true);

  const { mutateAsync: forgot_password } = useMutation({
    mutationFn: forgetPassword,
  });

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:w-[400px] sm:h-[400px] flex justify-center",
        className
      )}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Change Password</h1>
                <p className="text-muted-foreground text-balance">
                  Forgot your ZOB account
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
                  <Label htmlFor="password">New Password</Label>
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
                onClick={async () => {
                  const data = await forgot_password(userDetail);
                  if (data?.error) {
                    toast("Forgot Password", { description: data?.error });
                    return;
                  }
                  toast("Forgot Password", { description: data?.message });
                  setTimeout(() => {
                    window.location.href = "/login";
                  }, 1000);
                }}
              >
                Change Password
              </Button>
            </div>
          </form>
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
