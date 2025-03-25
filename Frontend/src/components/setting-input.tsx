import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function SettingInput({
  title,
  placeholder,
  message,
  cn,
  onvalue,
  onchangeFn,
}: {
  title: string;
  placeholder: string;
  message: string;
  cn: string;
  onvalue: string;
  onchangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={`grid w-full gap-1.5 ${cn}`}>
      <Label htmlFor="message-1">{title}</Label>
      <Input
        placeholder={placeholder}
        id="message-1"
        className="font-medium"
        defaultValue={onvalue}
        onChange={onchangeFn}
      />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
