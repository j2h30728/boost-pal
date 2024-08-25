import HeaderLayout from "@/components/common/header-layout";
import UploadForm from "@/components/post/upload-form";

export default function AddTweets() {
  return (
    <HeaderLayout isBackButton={true}>
      <UploadForm />
    </HeaderLayout>
  );
}
