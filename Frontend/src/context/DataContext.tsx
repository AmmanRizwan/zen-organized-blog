import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { Toaster } from "@/components/ui/sonner";
import AuthContext, { type ILoginUserData, type AuthContextType } from "./AuthContext";

export type { ILoginUserData, AuthContextType };
export { AuthContext as DataContext };

export default function DataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const storedUser = localStorage.getItem("user");
  const userData: ILoginUserData | null = storedUser ? JSON.parse(storedUser) : null;
  const isAuth: boolean = !!userData;
  const queryClient = new QueryClient();

  const login = (userData: ILoginUserData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    window.location.href = '/'; // Redirect to home page after login
  };

  const logout = () => {
    localStorage.removeItem("user");
    queryClient.clear(); // Clear any cached queries
    window.location.href = '/login';
  };

  const contextValue = {
    isAuth,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <ThemeProvider storageKey="vite-ui-theme">{children}</ThemeProvider>
        </SidebarProvider>
      </QueryClientProvider>
      <Toaster />
    </AuthContext.Provider>
  );
}
