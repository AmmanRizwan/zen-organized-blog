import { Send } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { CommentDrawer } from "./comment-drawer";
import CommentSheet from "./comment-sheet";
import OptionDialog from "./option-dialog";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "@/lib/fetchdata/likeApi";
import { toggleSave } from "@/lib/fetchdata/saveApi";
import LikeButton from "./like-button";
import SaveButton from "./save-button";
import { font_style } from "./font-selector";

export default function TemplateBlog({
  username,
  name,
  body,
  title,
  postId,
  blogId,
  likecount,
  saveId,
  userId,
  saveObj,
  blogOwner,
  createdAt,
}: {
  username: string;
  name: string;
  body: string;
  title: string;
  postId: string;
  blogId: string;
  likecount: number;
  saveId: string;
  userId: [{ likeuser: string }];
  saveObj: [{ userId: string }];
  blogOwner: string;
  createdAt: string;
}) {
  const queryClient = useQueryClient();

  const { mutateAsync: likebtnFn } = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const { mutateAsync: savebtnFn } = useMutation({
    mutationFn: toggleSave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  const createDateFn = (createdAt: string): string => {
    const date: Date = new Date(createdAt);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    return formattedDate;
  };

  return (
    <div className={`sm:w-[475px] sm:p-0 pl-4 pr-5 font-${font_style}`}>
      <div className="flex justify-between items-center py-2">
        <div className="flex gap-3 items-center">
          <div>
            {/* Dynamically Change in the Upcoming. Comment will remove */}
            <Link to={`/profile/${username}`}>
              <Avatar className="w-11 h-11">
                <AvatarFallback className="capitalize">
                  {name?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-lg">
              {/* Dynamically Change in the Upcoming. Comment will remove */}
              <Link to={`/profile/${username}`}>{name}</Link>
            </div>
            <div className="text-md font-medium text-muted-foreground select-none">
              @{username}
            </div>
          </div>
        </div>
        <div>
          <OptionDialog
            blogOwner={blogOwner}
            blogId={blogId}
            isSaved={saveObj}
            savebtnFn={savebtnFn}
            saveId={saveId}
          />
        </div>
      </div>

      <div className="pb-4">
        <h1 className="text-2xl font-medium my-3 select-none">{title}</h1>
        <p className="text-md text-muted-foreground font-medium select-none">
          {body}
        </p>
      </div>
      <div className="flex justify-between py-3 items-center">
        <div className="flex gap-3 items-center">
          <div className="flex gap-2 items-center">
            {/* Like Button */}
            <LikeButton id={userId} postId={blogId} likebtnFn={likebtnFn} />
            <span className="text-sm font-medium select-none">{likecount}</span>
          </div>
          <div className="flex gap-1 items-center">
            {/* Comment Button */}
            <CommentDrawer id={postId} />
            <CommentSheet id={postId} />
          </div>
          <Send size={20} className="cursor-pointer" />
        </div>

        <div className="flex gap-3">
          {/* Saved Button */}
          <SaveButton id={saveObj} savebtnFn={savebtnFn} saveId={saveId} />
        </div>
      </div>
      <div className="text-xs text-muted-foreground font-medium mb-3 select-none">
        {createDateFn(createdAt)}
      </div>
      <Separator />
    </div>
  );
}
