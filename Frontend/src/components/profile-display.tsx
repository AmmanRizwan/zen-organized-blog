import { useQuery } from "@tanstack/react-query";
import ShareDialog from "./share-dailog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getProfile } from "@/lib/fetchdata/userApi";

export default function ProfileDisplay({ username }: { username: string }) {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => getProfile({ username: username }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-10 sm:flex-row flex-col">
      <div className="my-4">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="text-[100px] font-medium capitalize">
            {profile?.name?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="text-2xl font-medium">{profile?.name}</p>
        <p className="text-muted-foreground font-medium">{profile?.username}</p>
        <p className="font-medium text-sm mb-8">{profile?.email}</p>
        {profile?.bio?.length >= 0 ? (
          <>
            <p className="text-muted-foreground font-medium text-sm">Bio</p>
            <p className="font-medium text-md mb-4">{profile?.bio}</p>
          </>
        ) : null}
        <ShareDialog username={username} />
      </div>
    </div>
  );
}
