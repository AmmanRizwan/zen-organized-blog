import { Link } from "react-router-dom";

interface IPBTemplate {
  title: string;
  paragraph: string;
  id: string;
}

export default function ProfileBlogTemplate({
  title,
  paragraph,
  id,
}: IPBTemplate) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border border-1 p-3 cursor-pointer">
        <h1 className="text-lg font-medium mb-3 select-none">{title}</h1>
        <p className="text-md text-muted-foreground select-none font-medium">
          {paragraph.length > 150 ? paragraph.slice(0, 150) : paragraph}
          {paragraph.length > 150 ? (
            <span className="text-white font-medium">...Read more</span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
