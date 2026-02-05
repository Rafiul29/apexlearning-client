import { userService } from "@/services/user.service";
import { UserTable } from "./_components/UserTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  
  const { data: users, error } = await userService.getUsers();

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Users
          </h1>
          <p className="text-slate-500 font-medium">
            Manage user roles, status, and permissions.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {error ? (
          <div className="p-20 text-center text-rose-500">{error.message}</div>
        ) : (
          <UserTable users={users || []} />
        )}
      </div>
    </div>
  );
}
