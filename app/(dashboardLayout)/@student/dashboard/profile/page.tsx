import { userService } from "@/services/user.service";
import { AvatarUpload } from "./_components/AvatarUpload";
import { PersonalInfoForm } from "./_components/PersonalInfoForm";
export const dynamic = "force-dynamic";

export default async function ProfileEditPage() {

  const { data: session } = await userService.getSession();
  const userInfo = session?.user;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-slate-500">Update your profile information and preferences.</p>
      </div>

      <div className="grid gap-8">
        <AvatarUpload />
        <PersonalInfoForm initialData={userInfo} />
      </div>
    </div>
  );
}