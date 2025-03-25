import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const font_style = localStorage.getItem("font-style") || "system";

export function FontSelector() {
  const [font, setFont] = useState<string>(localStorage.getItem("font-style")!);

  localStorage.setItem("font-style", font);

  return (
    <Select onValueChange={setFont}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Fonts" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Fonts</SelectLabel>
          <SelectItem value="inter">Inter</SelectItem>
          <SelectItem value="manrope">Manrope</SelectItem>
          <SelectItem value="jetbrains">JetBrains Mono</SelectItem>
          <SelectItem value="roboto">Roboto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
