import ProfileEditForm from "@/components/user/profile-edit-form";
import { getUserInfoBySession } from "@/service/userService";

export default async function EditProfilePage() {
  const { data: user, error } = await getUserInfoBySession();

  if (error) {
    throw error;
  }

  return (
    <main className="flex flex-col pb-40 h-screen">
      <ProfileEditForm initialUserInformation={user} />
    </main>
  );
}
