import TemplateBlog from "@/components/template-blog";
import { singleBlog } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, Params } from "react-router-dom";

export default function SingleBlogPage() {
  const { id }: Readonly<Params<string>> = useParams();

  const { data: single, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => singleBlog({ id: id! }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
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
