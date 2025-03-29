import CustomHead from "@/components/custom-head";
import { font_style } from "@/components/font-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlog } from "@/lib/fetchdata/blogApi";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function PostBlog() {
  const [blogDetail, setBlogDetail] = useState<{ title: string; body: string }>(
    { title: "", body: "" }
  );

  const { mutateAsync: post, isPending } = useMutation({
    mutationFn: createBlog,
  });

  return (
    <div className={`w-full flex justify-center font-${font_style}`}>
      <div className="flex flex-col w-5/6">
        <CustomHead
          title="Create Your Blog Post"
          description="Here you can create your blog"
        />
        <div className="my-8">
          <Input
            placeholder="Title"
            className="!border-none !outline-none focus:!ring-0 focus:outline-none focus:border-transparent sm:placeholder:text-3xl placeholder:text-xl text-xl sm:text-3xl font-medium md:text-3xl  mb-5"
            value={blogDetail.title}
            onChange={(e) =>
              setBlogDetail((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <Textarea
            placeholder="Content"
            className="h-65 !border-none !outline-none focus:!ring-0 focus:outline-none focus:border-transparent mb-5 !bg-transparent"
            value={blogDetail.body}
            onChange={(e) =>
              setBlogDetail((prev) => ({ ...prev, body: e.target.value }))
            }
          />
          <Button
            className="bg-green-500 hover:bg-green-600 active:bg-green-500 text-sm px-6 !py-1"
            onClick={async () => {
              const data = await post(blogDetail);
              if (data?.error) {
                console.log(await data);
                return;
              } else {
                setBlogDetail({ title: "", body: "" });
                setTimeout(() => {
                  window.location.href = "/";
                }, 1000);
                toast("Blog Post", {
                  description: "The Post has successfully created",
                });
              }
            }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" /> Please Wait
              </>
            ) : (
              "Send Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
