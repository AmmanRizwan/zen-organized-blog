import { useRef } from "react";
import { Copy } from "lucide-react";
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
import { QRCodeSVG } from "qrcode.react";

export default function ShareDialog({ username }: { username: string }) {
  const inputValue = useRef<HTMLInputElement>(null);
  const BASEURL = `http://localhost:3000/profile/${username}`;

  const handleClick = () => {
    if (inputValue.current) {
      navigator.clipboard.writeText(inputValue.current.defaultValue);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Share Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile link</DialogTitle>
          <DialogDescription>
            Anyone who has this link and qrcode will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center my-4">
            <QRCodeSVG value={BASEURL} size={200} />
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                ref={inputValue}
                id="link"
                defaultValue={BASEURL}
                readOnly
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleClick}
            >
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
