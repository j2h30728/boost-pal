import ProfileEditForm from "@/components/user/profile-edit-form";
import { getUserInfoBySession } from "@/service/userService";

export default async function EditProfilePage() {
  const user = await getUserInfoBySession();

  return (
    <main className="flex flex-col pb-40 h-screen">
      <ProfileEditForm initialUserInformation={user} />
    </main>
  );
}
