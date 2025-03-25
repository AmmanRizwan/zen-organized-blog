// Fetch the user data from the server

// Login Fetch Function

export const URL: string = import.meta.env.VITE_URL!;

export const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: username, password: password }),
  });

  return res.json();
};

// Logout Fetch Function
export const userLogout = async () => {
  const res = await fetch(`${URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
};

// SignUp Fetch Function
export const userSignup = async ({
  name,
  username,
  email,
  password,
}: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${URL}/auth/signup`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      username: username,
      password: password,
      email: email,
    }),
  });

  return res.json();
};

// User Profile Fetch Function
export const getProfile = async ({ username }: { username: string }) => {
  const res = await fetch(`${URL}/auth/profile/${username}`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

// User Update Profile Fetch Function
export const updateProfile = async ({
  name,
  username,
  email,
  bio,
}: {
  name: string;
  username: string;
  email: string;
  bio: string;
}) => {
  const res = await fetch(`${URL}/auth/update`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, username, bio }),
  });

  return res.json();
};

// Change Password Fetch Function
export const changePassword = async ({
  exist_password,
  new_password,
}: {
  exist_password: string;
  new_password: string;
}) => {
  const res = await fetch(`${URL}/auth/change`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      exist_password,
      new_password,
    }),
  });

  return res.json();
};

// Forget Password Fetch Function
export const forgetPassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const res = await fetch(`${URL}/auth/forgot`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
};
