import { font_style } from "@/components/font-selector";
import TemplateBlog from "@/components/template-blog";
import { Skeleton } from "@/components/ui/skeleton";
import { allBlogs } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export interface IBlog {
  id: string;
  title: string;
  body: string;
  userId: string;
  users: {
    name: string;
    username: string;
  };
  likes: [{ likeuser: string }];
  save: [{ userId: string }];
  createdAt: string;
}

export default function HomePage() {
  const { data: Blogs, isLoading } = useQuery({
    queryFn: () => allBlogs(),
    queryKey: ["blogs"],
  });

  if (isLoading) {
    return (
      <div className={`flex w-full justify-center !font-['${font_style}']`}>
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
    <div className={`w-full flex justify-center font-['${font_style}']`}>
      <div className="my-2">
        {Blogs?.map((blog: IBlog) => {
          return (
            <TemplateBlog
              createdAt={blog.createdAt}
              blogOwner={blog.userId}
              saveObj={blog.save}
              userId={blog.likes}
              saveId={blog.id}
              likecount={blog.likes?.length}
              blogId={blog.id}
              postId={blog.id}
              key={blog.id}
              username={blog.users.username}
              name={blog.users.name}
              body={blog.body}
              title={blog.title}
            />
          );
        })}
      </div>
    </div>
  );
}
