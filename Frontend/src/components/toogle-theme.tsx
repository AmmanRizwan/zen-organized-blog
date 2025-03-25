import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";

export default function ToggleTheme() {
  const [theme, setValueTheme] = useState<string>(
    localStorage.getItem("theme-select")!
  );

  localStorage.setItem("theme-select", theme);

  return (
    <div className="space-y-3 my-6">
      <RadioGroup
        value={theme}
        onValueChange={(e) => {
          localStorage.setItem("vite-ui-theme", e);
          setValueTheme(e);
        }}
        className="flex gap-4 sm:flex-row flex-col"
      >
        {/* Light Theme */}
        <Label className="cursor-pointer flex flex-col">
          <RadioGroupItem value="light" className="sr-only" />
          <Card
            className={`p-1 border-2 ${
              theme === "light"
                ? "border-muted-foreground"
                : "border-transparent"
            } transition-all`}
          >
            <CardContent className="p-2 bg-gray-100 rounded-md w-40 h-32">
              {/* Simulated Light Theme UI */}
              <div className="bg-white p-2 rounded-md shadow-md mb-1">
                <div className="bg-gray-200 h-2 w-16 rounded-md mb-1"></div>
                <div className="bg-gray-200 h-2 rounded-md w-20"></div>
              </div>
              <div className="bg-white p-2 rounded-md shadow-md flex gap-2 items-center mb-1">
                <div className="bg-gray-200 h-4 w-4 rounded-md"></div>
                <div className="bg-gray-200 h-2 rounded-md w-20"></div>
              </div>
              <div className="bg-white p-2 rounded-md shadow-md flex gap-2 items-center">
                <div className="bg-gray-200 h-4 w-4 rounded-md"></div>
                <div className="bg-gray-200 h-2 rounded-md w-20"></div>
              </div>
            </CardContent>
          </Card>
          <p>Light Mode</p>
        </Label>

        {/* Dark Theme */}
        <Label className="cursor-pointer flex flex-col">
          <RadioGroupItem value="dark" className="sr-only" />
          <Card
            className={`p-1 border-2 ${
              theme === "dark"
                ? "border-muted-foreground"
                : "border-transparent"
            } transition-all`}
          >
            <CardContent className="p-2 bg-gray-800 rounded-md w-40 h-32">
              {/* Simulated Dark Theme UI */}
              <div className="bg-gray-700 p-2 rounded-md shadow-md mb-1">
                <div className="bg-gray-500 h-2 w-16 rounded-md mb-1"></div>
                <div className="bg-gray-500 h-2 rounded-md w-20"></div>
              </div>
              <div className="bg-gray-700 p-2 rounded-md shadow-md flex gap-2 items-center mb-1">
                <div className="bg-gray-500 h-4 w-4 rounded-md"></div>
                <div className="bg-gray-500 h-2 rounded-md w-20"></div>
              </div>
              <div className="bg-gray-700 p-2 rounded-md shadow-md flex gap-2 items-center">
                <div className="bg-gray-500 h-4 w-4 rounded-md"></div>
                <div className="bg-gray-500 h-2 rounded-md w-20"></div>
              </div>
            </CardContent>
          </Card>
          <p>Dark Mode</p>
        </Label>
      </RadioGroup>
      <a href={"/appearance"}>
        <Button className="mt-10">Update Appearance</Button>
      </a>
    </div>
  );
}
