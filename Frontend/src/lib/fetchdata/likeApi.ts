import { URL } from "./userApi";

// Fetch the like post data from the server
export const toggleLike = async (id: string) => {
  const res = await fetch(`${URL}/l/like/${id}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const likeBlogs = async () => {
  const res = await fetch(`${URL}/l/like`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
