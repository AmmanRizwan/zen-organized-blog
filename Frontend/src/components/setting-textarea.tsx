import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function SettingTextArea({
  onvalue,
  bio,
  onchangeFn,
}: {
  onvalue: string;
  bio: string;
  onchangeFn: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="grid w-full gap-1.5 my-5">
      <Label htmlFor="message-2">Bio</Label>
      <Textarea
        placeholder="Type your message here."
        id="message-2"
        defaultValue={onvalue}
        onChange={onchangeFn}
      />
      <p className="text-[13px] text-muted-foreground font-medium text-right">
        {bio.length}/250
      </p>
    </div>
  );
}
