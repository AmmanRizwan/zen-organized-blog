import TemplateBlog from "@/components/template-blog";
import { saveBlogs } from "@/lib/fetchdata/saveApi";
import { useQuery } from "@tanstack/react-query";

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
    return <div>Loading...</div>;
  }

  console.log(saveBlog);

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
          {saveBlog.map((blog: ISaveBlogs) => {
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
          })}
        </div>
      </div>
    </div>
  );
}
