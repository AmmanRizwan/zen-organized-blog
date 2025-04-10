import { DataContext } from "@/context/DataContext";
import { Heart } from "lucide-react";
import { useContext } from "react";

export default function LikeButton({
  id,
  likebtnFn,
  postId,
}: {
  id: [{ likeuser: string }];
  likebtnFn: any;
  postId: string;
}) {
  const { userData }: any = useContext(DataContext);

  return (
    <>
      {id?.find((i) => i.likeuser === userData?.id) ? (
        <Heart
          className="cursor-pointer"
          stroke="red"
          fill="red"
          onClick={async () => {
            await likebtnFn(postId);
          }}
        />
      ) : (
        <Heart
          className="cursor-pointer"
          onClick={async () => {
            await likebtnFn(postId);
          }}
        />
      )}
    </>
  );
}
