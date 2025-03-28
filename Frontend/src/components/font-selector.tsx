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

export const font_style = localStorage.getItem("font-style") || "jetbrains";

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
          <SelectItem value="poppins">Poppins</SelectItem>
          <SelectItem value="gidole">Gidole</SelectItem>
          <SelectItem value="roboto">Roboto</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
