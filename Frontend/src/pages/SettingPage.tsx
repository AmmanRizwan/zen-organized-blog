import SettingTextArea from "@/components/setting-textarea";
import SettingInput from "@/components/setting-input";
import SettingURLInput from "@/components/setting-url-input";
import { Button } from "@/components/ui/button";
import { UpdatePasswordDialog } from "@/components/update-password-dialog";
import CustomHead from "@/components/custom-head";
import { useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/lib/fetchdata/userApi";
import { toast } from "sonner";
import { font_style } from "@/components/font-selector";

export default function SettingPage() {
  const { userData } = useContext(DataContext)!;

  const { mutateAsync: update } = useMutation({
    mutationFn: updateProfile,
  });

  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
  });

  return (
    <div className={`w-full justify-center flex font-['${font_style}']`}>
      <div className="flex flex-col sm:w-5/6 px-6">
        <CustomHead
          title={"Settings"}
          description={
            "You can update your account settings and email preferences effortlessly."
          }
        />
        <SettingInput
          title="Name"
          placeholder="Your Name"
          message="This is your public display name. It can be your real name. You can change this from here."
          onvalue={profile.name}
          onchangeFn={(e) =>
            setProfile((prev) => ({ ...prev, name: e.target.value }))
          }
          cn="my-5"
        />
        <SettingInput
          title="Username"
          placeholder="Your Username"
          message="This is your public display username. You can change this from here."
          onvalue={profile.username}
          onchangeFn={(e) =>
            setProfile((prev) => ({ ...prev, username: e.target.value }))
          }
          cn="my-5"
        />
        <SettingInput
          title="Email"
          placeholder="Your Email"
          message="This is your public display email. You can change this from here."
          onvalue={profile.email}
          onchangeFn={(e) =>
            setProfile((prev) => ({ ...prev, email: e.target.value }))
          }
          cn="my-5"
        />
        <SettingTextArea
          onvalue={profile.bio}
          bio={profile.bio}
          onchangeFn={(e) =>
            setProfile((prev) => ({ ...prev, bio: e.target.value }))
          }
        />
        <SettingURLInput username={userData.username} />
        <div className="my-5 flex gap-6 pb-20 sm:flex-row flex-col">
          <Button
            onClick={async () => {
              const data = await update(profile);
              console.log(await data);
              toast("User Setting", {
                description: "The Changes has saved into the database",
              });
            }}
          >
            Update Profile
          </Button>{" "}
          <UpdatePasswordDialog />
        </div>
      </div>
    </div>
  );
}
