import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "@/lib/fetchdata/userApi";
import FrontImage from "@/assets/sign-login-blog.png";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface ISignup {
  name: string;
  username: string;
  email: string;
  password: string;
}

export function Signup({ className, ...props }: React.ComponentProps<"div">) {
  const [newUser, setNewUser] = useState<ISignup>({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const [hide, setHide] = useState<boolean>(true);

  const { mutateAsync: signup, isPending } = useMutation({
    mutationFn: userSignup,
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to ZOE</h1>
                <p className="text-muted-foreground text-balance">
                  Create a new account in ZOB
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={hide ? "password" : "text"}
                      placeholder="Enter Password"
                      value={newUser.password}
                      className="pr-[34px]"
                      onChange={(e) =>
                        setNewUser((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      required
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
                  const data = await signup(newUser);
                  if (data?.error) {
                    // console.log(await data);
                    toast("Error", {
                      description: data?.error,
                    });
                    return;
                  }
                  localStorage.setItem("user", JSON.stringify(data));
                  // console.log(await data);
                  toast("User SignUp", {
                    description: "User Signup Successfully",
                  });
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 1000);
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="animate-spin" /> Please Wait
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
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
