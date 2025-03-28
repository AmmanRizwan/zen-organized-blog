import { font_style } from "@/components/font-selector";
import TemplateBlog from "@/components/template-blog";
import { Skeleton } from "@/components/ui/skeleton";
import { singleBlog } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, Params } from "react-router-dom";

export default function SingleBlogPage() {
  const { id }: Readonly<Params<string>> = useParams();

  const { data: single, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => singleBlog({ id: id! }),
  });

  if (isLoading) {
    return (
      <div className={`flex w-full justify-center font-['${font_style}']`}>
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
    <div className="w-full justify-center items-center flex">
      <div className="flex flex-col">
        <TemplateBlog
          createdAt={single?.createdAt}
          blogOwner={single?.userId}
          saveObj={single?.save}
          userId={single?.likes}
          blogId={single?.id}
          likecount={single?.likes?.length}
          postId={single?.id}
          saveId={single?.id}
          username={single?.users?.username}
          name={single?.users?.name}
          title={single?.title}
          body={single?.title}
        />
      </div>
    </div>
  );
}
