import { createContext, ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import { font_style } from "@/components/font-selector";
import { Toaster } from "@/components/ui/sonner";

interface ILoginUserData {
  id: string;
  username: string;
  name: string;
  email: string;
}

interface DataContextType {
  isAuth: string;
  userData: ILoginUserData;
}

export const DataContext = createContext<DataContextType | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const userData: ILoginUserData = JSON.parse(localStorage.getItem("user")!);
  const isAuth: string = localStorage.getItem("user")!;
  const queryClient = new QueryClient();
  const contextValue = {
    isAuth,
    userData,
  };

  document.body.classList.add(`font-${font_style}`);

  return (
    <DataContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger />
          <ThemeProvider storageKey="vite-ui-theme">{children}</ThemeProvider>
        </SidebarProvider>
      </QueryClientProvider>
      <Toaster />
    </DataContext.Provider>
  );
}
