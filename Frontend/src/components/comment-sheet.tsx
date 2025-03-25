import { MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  allComment,
  createComment,
  editComment,
  getsingleComment,
  removeComment,
} from "@/lib/fetchdata/commentApi";
import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { DataContext } from "@/context/DataContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  users: { username: string };
}

export default function CommentSheet({ id }: { id: string }) {
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

  const { mutateAsync: updatecomment } = useMutation({
    mutationFn: editComment,
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

  const { mutateAsync: deletecomment } = useMutation({
    mutationFn: removeComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const [content, setContent] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<string>("");

  return (
    <Sheet>
      <SheetTrigger>
        <MessageCircle className="cursor-pointer hidden sm:block" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>List of comments of your blog</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-full overflow-auto">
          {/* Start of the main comment to be similar */}
          {comments?.map((bun: IComment) => {
            return (
              <div
                className="pl-6 pr-3 flex justify-between items-center gap-4 my-4"
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
                  {/* <Ellipsis size={18} /> */}
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
                          console.log({
                            error: "You are not the own of this comment",
                          });
                        }}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant={"destructive"}
                        onClick={async () => {
                          if (bun.userId === userData.id) {
                            const data = await deletecomment(bun.id);
                            console.log(await data);
                            return;
                          }
                          console.log({
                            error: "You are not the own of this comment",
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
          })}
          {/* End of the main comment to be similar */}
        </ScrollArea>
        <SheetFooter>
          <div className="flex gap-3">
            <Input
              placeholder="Enter Your Comment"
              className="rounded-full pl-6 text-sm sm:text-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button
              onClick={async () => {
                if (isUpdating) {
                  const data = await updatecomment({ id: updateId, content });
                  console.log(await data);
                  setContent("");
                } else {
                  const data = await postcomment({ id, content });
                  console.log(await data);
                  setContent("");
                }
              }}
            >
              <Send />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
