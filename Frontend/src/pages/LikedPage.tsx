import TemplateBlog from "@/components/template-blog";
import { likeBlogs } from "@/lib/fetchdata/likeApi";
import { useQuery } from "@tanstack/react-query";

interface ILikeBlogs {
  createdAg: string;
  id: string;
  isLiked: true;
  likeuser: string;
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
  userId: string;
}

export default function LikedPage() {
  const { data: likes, isLoading } = useQuery({
    queryFn: () => likeBlogs(),
    queryKey: ["blogs"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(likes);

  return (
    <div className="w-full mb-20 flex justify-center">
      <div>
        <div className="my-6 px-3">
          <h1 className="text-3xl font-bold select-none">Liked Blog</h1>
          <p className="text-muted-foreground font-medium mt-1">
            Here, you can find the list of blogs you have liked.
          </p>
        </div>
        <div className="my-2">
          {likes?.map((like: ILikeBlogs) => {
            return (
              <TemplateBlog
                createdAt={like.post.createdAt}
                blogOwner={like.post.userId}
                saveObj={like.post.save}
                userId={like.post.likes}
                blogId={like.postId}
                likecount={like.post.likes.length}
                saveId={like.postId}
                key={like.id}
                username={like.post.users.username}
                name={like.post.users.name}
                title={like.post.title}
                body={like.post.body}
                postId={like.post.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
