import { Separator } from "./ui/separator";

export default function CustomHead({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="">
      <h2 className="text-3xl font-bold mt-10 ">{title}</h2>
      <p className="mt-4 text-muted-foreground font-normal text-lg">
        {description}
      </p>
      <Separator className="my-4" />
    </div>
  );
}
