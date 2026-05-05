import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { userService } from "@/services/user.service";

const DashboardLayout = async ({
  admin,
  student,
  tutor,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={userInfo} />
      <SidebarInset className="bg-slate-50/50 dark:bg-[#0a0a0a] transition-colors duration-500">
        <SiteHeader />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="@container/main flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
              {userInfo?.role === UserRole.ADMIN && admin}
              {userInfo?.role === UserRole.TUTOR && tutor}
              {userInfo?.role === UserRole.STUDENT && student}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
