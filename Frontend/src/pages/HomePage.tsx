import TemplateBlog from "@/components/template-blog";
import { Skeleton } from "@/components/ui/skeleton";
import { allBlogs } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";

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
      <div>
        <div className="sm:w-[475px] sm:p-0 pl-4 pr-5">
          <div className="flex justify-between items-center py-2">
            <div className="flex gap-3 items-center">
              <div>
                <Skeleton className="w-11 h-11" />
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-lg">
                  <Skeleton className="w-[60px] h-[8px]" />
                </div>
                <div className="text-md font-medium text-muted-foreground select-none">
                  <Skeleton className="w-[50px] h-[8px]" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="sm:w-[457px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  console.log(Blogs);

  return (
    <div className="w-full flex justify-center">
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
