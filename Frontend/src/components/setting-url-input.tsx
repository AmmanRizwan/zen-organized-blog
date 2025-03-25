import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SettingURLInput({ username }: { username: string }) {
  return (
    <>
      <div className="grid w-full gap-1.5 my-5">
        <Label htmlFor="message-2">URL</Label>
        <p className="text-[13px] text-muted-foreground">
          Your link to share your profile
        </p>
        <Input
          placeholder="Your URL"
          id="message-2"
          readOnly
          defaultValue={`localhost:5173/profile/${username}`}
        />
      </div>
    </>
  );
}
