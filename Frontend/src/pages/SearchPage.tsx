import CustomHead from "@/components/custom-head";
import { font_style } from "@/components/font-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bug } from "lucide-react";

export default function SearchPage() {
  return (
    <div className={`w-full flex justify-center font-['${font_style}']`}>
      <div className="flex flex-col w-5/6">
        <CustomHead
          title="Search People"
          description="Here You can Search people "
        />

        <div className="flex gap-4">
          <Input placeholder="Type the username to Search" />
          <Button>Search</Button>
        </div>
        <div className="flex justify-center py-4 flex-col items-center h-[500px]">
          <div>
            <Bug color="red" size={40} />
          </div>
          <div className="text-center w-[200px] my-3 text-muted-foreground font-medium">
            The Search Page is under Developer It may Take Time to Complete
          </div>
        </div>
      </div>
    </div>
  );
}
