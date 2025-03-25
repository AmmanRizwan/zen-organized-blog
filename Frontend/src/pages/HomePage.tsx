import TemplateBlog from "@/components/template-blog";
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
    return <div>Loading...</div>;
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
