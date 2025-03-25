// Fetch the blogs from the server

import { URL } from "./userApi";

export const allBlogs = async () => {
  const res = await fetch(`${URL}/p/blogs`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const userBlog = async ({ username }: { username: string }) => {
  const res = await fetch(`${URL}/p/user_blog/${username}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const singleBlog = async ({ id }: { id: string }) => {
  const res = await fetch(`${URL}/p/blog/${id}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const createBlog = async ({
  title,
  body,
}: {
  title: string;
  body: string;
}) => {
  const res = await fetch(`${URL}/p/blog`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  return res.json();
};

export const deleteBlog = async ({ id }: { id: string }) => {
  const res = await fetch(`${URL}/p/blog/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
