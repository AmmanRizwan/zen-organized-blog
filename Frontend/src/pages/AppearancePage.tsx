import CustomHead from "@/components/custom-head";
import { font_style, FontSelector } from "@/components/font-selector";
import ToggleTheme from "@/components/toogle-theme";
import { Label } from "@/components/ui/label";

export default function AppearancePage() {
  return (
    <div className={`w-full justify-center flex font['${font_style}']`}>
      <div className="flex flex-col w-5/6">
        <CustomHead
          title={"Appearance"}
          description={
            "Manage your apperance of your website preferences the way it looks."
          }
        />
        <div className={`grid w-full gap-1.5 my-5`}>
          <Label htmlFor="message-1">Font Style</Label>
          <FontSelector />
          <p className="text-sm text-muted-foreground">
            Set the font you want to use in the preferences.
          </p>
        </div>
        <div className="grid w-full gap-1.5 my-5">
          <Label htmlFor="message-2">Select Theme</Label>
          <p className="text-sm text-muted-foreground">
            Set the theme you want to use in the preferences.
          </p>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
}
