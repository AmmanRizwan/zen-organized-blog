import { font_style } from "@/components/font-selector";
import TemplateBlog from "@/components/template-blog";
import { Skeleton } from "@/components/ui/skeleton";
import { saveBlogs } from "@/lib/fetchdata/saveApi";
import { useQuery } from "@tanstack/react-query";
import { Info, Loader2 } from "lucide-react";

interface ISaveBlogs {
  createdAg: string;
  id: string;
  isSaved: true;
  post: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    userId: string;
    likes: [{ likeuser: string }];
    save: [{ userId: string }];
    users: { username: string; name: string };
  };
  postId: string;
  postData: string;
  userId: string;
}

export default function SavedPage() {
  const { data: saveBlog, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => saveBlogs(),
  });

  if (isLoading) {
    return (
      <div className={`flex w-full justify-center font-${font_style}`}>
        <div className="flex flex-col">
          <div className="sm:block hidden">
            <div className="flex gap-4 my-3 items-center">
              <div>
                <Skeleton className="w-11 h-11 rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[250px] h-[12px]" />
                <Skeleton className="w-[200px] h-[12px]" />
              </div>
            </div>
            <div>
              <Skeleton className="sm:w-[457px] sm:h-[350px] mb-4 rounded-none" />
            </div>
            <div className="flex gap-4 my-3 items-center">
              <div>
                <Skeleton className="w-11 h-11 rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[250px] h-[12px]" />
                <Skeleton className="w-[200px] h-[12px]" />
              </div>
            </div>
            <div>
              <Skeleton className="sm:w-[457px] sm:h-[350px] mb-4 rounded-none" />
            </div>
            <div className="flex gap-4 my-3 items-center">
              <div>
                <Skeleton className="w-11 h-11 rounded-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="w-[250px] h-[12px]" />
                <Skeleton className="w-[200px] h-[12px]" />
              </div>
            </div>
            <div>
              <Skeleton className="sm:w-[457px] sm:h-[350px] mb-4 rounded-none" />
            </div>
          </div>
        </div>
        <div className="sm:hidden flex justify-center items-center gap-2 flex-col text-muted-foreground ">
          <Loader2 className="animate-spin w-12 h-12" />
          <p>Loading Blogs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-20 flex justify-center">
      <div>
        <div className="my-6 px-3">
          <h1 className="text-3xl font-semibold select-none">Saved Blogs</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Here, you can find the list of blogs you have saved.
          </p>
        </div>
        <div className="my-2">
          {saveBlog.length > 0 ? (
            saveBlog.map((blog: ISaveBlogs) => {
              return (
                <TemplateBlog
                  createdAt={blog.post.createdAt}
                  blogOwner={blog.post.userId}
                  saveObj={blog.post.save}
                  userId={blog.post.likes}
                  blogId={blog.postId}
                  saveId={blog.postId}
                  likecount={blog.post.likes.length}
                  key={blog.id}
                  name={blog.post.users.name}
                  username={blog.post.users.username}
                  title={blog.post.title}
                  body={blog.post.body}
                  postId={blog.post.id}
                />
              );
            })
          ) : (
            <div className="flex flex-col justify-center items-center py-10 gap-3">
              <div>
                <Info size={50} />
              </div>
              <div className="text-2xl font-medium text-muted-foreground">
                No Save Blog
              </div>
              <div className="text-muted-foreground">
                Sorry! There is not post that you have saved.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
