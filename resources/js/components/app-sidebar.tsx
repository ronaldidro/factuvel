import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { useCan } from '@/hooks/use-can';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, Notebook, UsersRound } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { title: 'Users', href: '/users', icon: UsersRound, permission: 'users.index' },
  { title: 'Roles', href: '/roles', icon: Notebook, permission: 'roles.index' },
];

export function AppSidebar() {
  const { can } = useCan();
  const navItems = mainNavItems.filter(({ permission }) => !permission || can(permission));

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
    </Sidebar>
  );
}
