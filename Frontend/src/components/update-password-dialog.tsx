import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/lib/fetchdata/userApi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

function CustomPasswordInput({
  title,
  placeholder,
  onvalue,
  onchangeFn,
}: {
  title: string;
  placeholder: string;
  onvalue: string;
  onchangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center space-x-2">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="link" className="text-md">
          {title}
        </Label>
        <Input
          id="link"
          placeholder={placeholder}
          value={onvalue}
          onChange={onchangeFn}
          required
        />
      </div>
    </div>
  );
}

export function UpdatePasswordDialog() {
  const { mutateAsync: changing_password } = useMutation({
    mutationFn: changePassword,
  });

  const [passwordDetail, setPasswordDetail] = useState({
    exist_password: "",
    new_password: "",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <CustomPasswordInput
          title="Current Password"
          placeholder="Enter Your Current Password"
          onchangeFn={(e) =>
            setPasswordDetail((prev) => ({
              ...prev,
              exist_password: e.target.value,
            }))
          }
          onvalue={passwordDetail.exist_password}
        />
        <CustomPasswordInput
          title="New Password"
          placeholder="Enter Your New Password"
          onchangeFn={(e) =>
            setPasswordDetail((prev) => ({
              ...prev,
              new_password: e.target.value,
            }))
          }
          onvalue={passwordDetail.new_password}
        />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant={"secondary"}
              onClick={async () => {
                const data = await changing_password(passwordDetail);
                if (data?.error) {
                  // console.log(data);
                  toast("Error", { description: data.error });
                  return;
                }
                setPasswordDetail({ exist_password: "", new_password: "" });
                // console.log(data);
                toast("Change Password", { description: data.message });
              }}
            >
              Update Password
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
