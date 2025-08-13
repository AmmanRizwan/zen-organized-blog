import { Home, Inbox, LucideBlocks, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { DataContext } from "@/context/DataContext";
import { useContext } from "react";
import DefaultProfile from "@/assets/default_profile.jpeg";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Post Blog",
    url: "/create",
    icon: Inbox,
  },
  {
    title: "Appearance",
    url: "/appearance",
    icon: LucideBlocks,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
  },
];

export function AppSidebar() {
  const data_value = useContext(DataContext);
  const { userData }: any = useContext(DataContext);

  if (!data_value?.isAuth) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-muted-foreground font-medium text-md">
              <Avatar className="w-12 h-12 rounded-full">
                <AvatarFallback>ZOB</AvatarFallback>
              </Avatar>
              Zen Organized Blog
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userData?.name,
            email: userData?.email,
            avatar: DefaultProfile,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
