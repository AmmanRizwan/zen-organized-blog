import CustomHead from "@/components/custom-head";
import ProfileBlogTemplate from "@/components/profile-blog-template";
import ProfileDisplay from "@/components/profile-display";
import { userBlog } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";
import type { Params } from "react-router-dom";
import { useParams } from "react-router-dom";

interface IUserBlogs {
  body: string;
  createdAt: Date;
  id: string;
  title: string;
  updatedAt: Date;
  userId: string;
}

export default function ProfilePage() {
  const { username }: Readonly<Params<string>> = useParams();

  const { data: userBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => userBlog({ username: username! }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(userBlogs);

  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 flex flex-col">
        <CustomHead title="User Profile" description="" />
        <ProfileDisplay username={username!} />
        <CustomHead title="Blogs" description="" />
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-4 pb-20">
          {userBlogs.post?.length > 0 ? (
            userBlogs.post?.map((blog: IUserBlogs) => {
              return (
                <ProfileBlogTemplate
                  id={blog.id}
                  key={blog.id}
                  title={blog.title}
                  paragraph={blog.body}
                />
              );
            })
          ) : (
            <div>NO Posts</div>
          )}
        </div>
      </div>
    </div>
  );
}
