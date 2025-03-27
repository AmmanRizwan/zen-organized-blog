import { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BookmarkCheck,
  BookmarkIcon,
  Check,
  Ellipsis,
  Link2,
  QrCodeIcon,
  Trash2Icon,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { DataContext } from "@/context/DataContext";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "@/lib/fetchdata/blogApi";
import { toast } from "sonner";

export default function OptionDialog({
  blogOwner,
  blogId,
  isSaved,
  saveId,
  savebtnFn,
}: {
  blogId: string;
  isSaved: [{ userId: string }];
  saveId: string;
  savebtnFn: any;
  blogOwner: string;
}) {
  const queryClient = useQueryClient();
  const [copy, setCopy] = useState<boolean>(false);
  const BASEURL = `https://zen-organized-blog.vercel.app/blog/${blogId}`;

  const handleClick = () => {
    navigator.clipboard.writeText(BASEURL);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const { mutateAsync: removeblog } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const { userData }: any = useContext(DataContext);

  return (
    <Dialog>
      <DialogTrigger>
        <Ellipsis className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Options</DialogTitle>
          <DialogDescription>
            Here are the option to operate this post.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 sm:gap-8 justify-center my-4">
          {/* Save the Blog */}
          <div className="border border-2 fit-content p-4 rounded-full cursor-pointer hover:bg-muted-foreground/20">
            {isSaved?.find((i) => i.userId === userData?.id) ? (
              <BookmarkCheck
                size={30}
                onClick={async () => {
                  await savebtnFn(saveId);
                }}
              />
            ) : (
              <BookmarkIcon
                size={30}
                onClick={async () => {
                  await savebtnFn(saveId);
                }}
              />
            )}
          </div>

          {/* Copy Blog Link */}
          <div
            className="border border-2 fit-content p-4 rounded-full cursor-pointer hover:bg-muted-foreground/20"
            onClick={handleClick}
          >
            {copy ? (
              <Check size={30} className="transform" />
            ) : (
              <Link2 size={30} className="transform -rotate-45" />
            )}
          </div>

          {/* Generate QR Code */}
          <Dialog>
            <DialogTrigger>
              <div className="border border-2 fit-content p-4 rounded-full cursor-pointer hover:bg-muted-foreground/20">
                <QrCodeIcon size={30} />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share With QR Code</DialogTitle>
                <DialogDescription>
                  Generated the QR Code to Share this blog
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 items-center">
                <div className="font-medium text-xl">Share using QR Code</div>
                <div className="flex justify-center my-4">
                  <QRCodeSVG value={BASEURL} size={200} />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <Separator />
        <Button
          variant={"destructive"}
          className="text-muted-foreground flex gap-3 items-center"
          onClick={async () => {
            if (blogOwner === userData.id) {
              await removeblog({ id: blogId });
              toast("Blog Post", {
                description: "Blog post deleted Successfully",
              });
              return;
            }
            toast("Error", {
              description: "You are not the owner of this post",
            });
          }}
        >
          {" "}
          <Trash2Icon size={20} /> Delete Post
        </Button>
      </DialogContent>
    </Dialog>
  );
}
