import { URL } from "./userApi";
// Fetch the comment post data from the server

export const allComment = async (id: string) => {
  const res = await fetch(`${URL}/b/blog/comments/${id}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const createComment = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const res = await fetch(`${URL}/b/comment/${id}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content }),
  });

  return res.json();
};

export const editComment = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const res = await fetch(`${URL}/b/comment/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content }),
  });

  return res.json();
};

export const removeComment = async (id: string) => {
  const res = await fetch(`${URL}/b/comment/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const getsingleComment = async (id: string) => {
  const res = await fetch(`${URL}/b/comment/${id}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
