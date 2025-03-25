import { URL } from "./userApi";

// Fetch the save post data from the server
export const saveBlogs = async () => {
  const res = await fetch(`${URL}/user/save`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

export const toggleSave = async (id: string) => {
  const res = await fetch(`${URL}/user/save/${id}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};
