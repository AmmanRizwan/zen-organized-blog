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
            const data = await savebtnFn(saveId);
            // console.log(await data);
          }}
        />
      ) : (
        <Bookmark
          className="cursor-pointer"
          onClick={async () => {
            const data = await savebtnFn(saveId);
            // console.log(await data);
          }}
        />
      )}
    </>
  );
}
