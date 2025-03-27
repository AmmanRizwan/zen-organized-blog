import { DataContext } from "@/context/DataContext";
import { Bookmark } from "lucide-react";
import { useContext } from "react";

export default function SaveButton({
  id,
  savebtnFn,
  saveId,
}: {
  id: [{ userId: string }];
  savebtnFn: any;
  saveId: string;
}) {
  const { userData }: any = useContext(DataContext);

  return (
    <>
      {id?.find((i) => i.userId === userData?.id) ? (
        <Bookmark
          className="cursor-pointer light:fill-dark dark:fill-white"
          stroke="gray/10"
          fill="gray/10"
          onClick={async () => {
            await savebtnFn(saveId);
          }}
        />
      ) : (
        <Bookmark
          className="cursor-pointer"
          onClick={async () => {
            await savebtnFn(saveId);
          }}
        />
      )}
    </>
  );
}
