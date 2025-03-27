import CustomHead from "@/components/custom-head";
import ProfileBlogTemplate from "@/components/profile-blog-template";
import ProfileDisplay from "@/components/profile-display";
import { Button } from "@/components/ui/button";
import { userBlog } from "@/lib/fetchdata/blogApi";
import { useQuery } from "@tanstack/react-query";
import { Info, Loader2 } from "lucide-react";
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
    return (
      <div className="flex justify-center items-center w-full my-20 flex-col gap-4">
        <div>
          <Loader2 size={50} className="animate-spin" />
        </div>
        <div className="text-2xl text-muted-foreground">Loading Profile</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-5/6 flex flex-col">
        <CustomHead title="User Profile" description="" />
        <ProfileDisplay username={username!} />
        <CustomHead title="Blogs" description="" />
        <div
          className={
            userBlogs.post?.length > 0
              ? `grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-4 pb-20`
              : ""
          }
        >
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
            <div className="w-full flex justify-center items-center flex-col gap-4 py-4 pb-20">
              <Info size={55} />
              <div className="text-3xl font-medium ">No Blog Posts</div>
              <div>
                <a href="/create">
                  <Button>Create Post</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
