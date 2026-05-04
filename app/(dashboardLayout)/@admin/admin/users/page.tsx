import { userService } from "@/services/user.service";
import { UserTable } from "./_components/UserTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { User } from "@/types";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const { data: users, error } = await userService.getUsers();

  const students = users?.filter((user: User) => user.role === "STUDENT") || [];
  const teachers = users?.filter((user: User) => user.role === "TUTOR") || [];
  const admins = users?.filter((user: User) => user.role === "ADMIN") || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Users <span className="text-emerald-600">Management</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Manage roles, status, and permissions for the Apex community.
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-emerald-200 dark:border-emerald-500/20 p-20 text-center text-emerald-500 shadow-sm">
          {error.message}
        </div>
      ) : (
        <Tabs defaultValue="students" className="w-full space-y-6">
          <TabsList className="bg-slate-100 dark:bg-white/5 p-1.5 rounded-2xl inline-flex h-auto border dark:border-white/5">
            <TabsTrigger
              value="teachers"
              className="px-8 py-3 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-500 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all text-sm"
            >
              Teachers ({teachers.length})
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="px-8 py-3 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-500 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all text-sm"
            >
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger
              value="admins"
              className="px-8 py-3 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-500 dark:data-[state=active]:text-white data-[state=active]:shadow-sm transition-all text-sm"
            >
              Admins ({admins.length})
            </TabsTrigger>
          </TabsList>

          <div className="bg-white dark:bg-white/[0.02] rounded-[32px] border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden transition-all">
            <TabsContent value="teachers" className="m-0 focus-visible:ring-0">
              <UserTable users={teachers} />
            </TabsContent>
            <TabsContent value="students" className="m-0 focus-visible:ring-0">
              <UserTable users={students} />
            </TabsContent>
            <TabsContent value="admins" className="m-0 focus-visible:ring-0">
              <UserTable users={admins} />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
}
