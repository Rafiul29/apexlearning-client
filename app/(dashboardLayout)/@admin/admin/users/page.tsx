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
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Users Management
          </h1>
          <p className="text-slate-500 font-medium">
            Manage roles, status, and permissions for the community.
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-white rounded-xl border border-rose-200 p-20 text-center text-rose-500 shadow-sm">
          {error.message}
        </div>
      ) : (
        <Tabs defaultValue="students" className="w-full space-y-4">
          <TabsList className="bg-slate-100 p-1 rounded-lg inline-flex">
            <TabsTrigger
              value="teachers"
              className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Teachers ({teachers.length})
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Students ({students.length})
            </TabsTrigger>

            <TabsTrigger
              value="admins"
              className="px-6 py-2 rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
            >
              Admins ({admins.length})
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <TabsContent value="teachers" className="m-0">
              <UserTable users={teachers} />
            </TabsContent>
            <TabsContent value="students" className="m-0">
              <UserTable users={students} />
            </TabsContent>
            <TabsContent value="admins" className="m-0">
              <UserTable users={admins} />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
}
