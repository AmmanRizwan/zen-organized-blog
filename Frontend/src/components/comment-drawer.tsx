import { Info, MessageCircleIcon, MoreHorizontal, Send } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allComment,
  createComment,
  editComment,
  getsingleComment,
  removeComment,
} from "@/lib/fetchdata/commentApi";
import { IComment } from "./comment-sheet";
import { useContext, useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DataContext } from "@/context/DataContext";
import { toast } from "sonner";

export function CommentDrawer({ id }: { id: string }) {
  const { userData }: any = useContext(DataContext);

  const queryClient = useQueryClient();

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => allComment(id),
    enabled: !!id,
  });

  const { mutateAsync: postcomment } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutateAsync: deletecomment } = useMutation({
    mutationFn: removeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutateAsync: singlecomment } = useMutation({
    mutationFn: getsingleComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const { mutateAsync: updatecomment } = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const [content, setContent] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  return (
    // Hidden the comment drawer when it is in desktop mode
    <Drawer>
      <DrawerTrigger>
        <MessageCircleIcon className="cursor-pointer sm:hidden" />
      </DrawerTrigger>
      <DrawerContent className="h-[80vh]">
        <DrawerHeader>
          <DrawerTitle className="flex justify-center text-xl">
            Comments
          </DrawerTitle>
          <DrawerDescription className="flex justify-center">
            List of comments of your blog
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full overflow-auto">
          {/* Start of the main comment to be similar */}
          {comments?.length > 0 ? (
            comments?.map((bun: IComment) => {
              return (
                <div
                  className="flex justify-between items-center gap-4 my-4 pl-6 pr-3"
                  key={bun.id}
                >
                  <div className="flex gap-3">
                    <div className="flex">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="capitalize">
                          {bun.users.username.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-4 items-center">
                        <div className="text-[13px] font-medium">
                          {bun.users.username}
                        </div>
                      </div>
                      <div className="text-[14px] ">{bun.content}</div>
                    </div>
                  </div>
                  <div>
                    {/* <Ellipsis size={20} className="cursor-pointer" /> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={async () => {
                            if (bun.userId === userData.id) {
                              const data = await singlecomment(bun.id);
                              // console.log(data);
                              setContent(data.content);
                              setIsUpdating(true);
                              setUpdateId(bun.id);
                              return;
                            }
                            toast("Error", {
                              description:
                                "You are not the own of this comment",
                            });
                          }}
                        >
                          Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant={"destructive"}
                          onClick={async () => {
                            if (bun.userId === userData.id) {
                              await deletecomment(bun.id);
                              toast("Comment", {
                                description: "Comment deleted Successfully",
                              });
                              return;
                            }
                            toast("Error", {
                              description:
                                "You are not the own of this comment",
                            });
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center gap-3 my-10">
              <div>
                <Info size={50} />
              </div>
              <div className="text-muted-foreground">
                No Comments on this Post
              </div>
            </div>
          )}
          {/* End of the main comment to be similar */}
        </ScrollArea>
        <DrawerFooter>
          <div className="flex gap-1">
            <Input
              placeholder="Enter Your Comment"
              className="rounded-full pl-6 text-sm sm:text-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              className="rounded-full -ml-10"
              onClick={async () => {
                if (isUpdating) {
                  await updatecomment({ id: updateId, content });
                  toast("Comment", {
                    description: "Commment has updated",
                  });
                  setContent("");
                } else {
                  await postcomment({ id, content });
                  toast("Comment", {
                    description: "Comment has added",
                  });
                  setContent("");
                }
              }}
            >
              <Send />
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
