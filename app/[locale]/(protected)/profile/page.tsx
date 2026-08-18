import { ProfileComponent } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | CINEBOOK",
  description: "Profile user.",
};

function ProfilePage() {
  return <ProfileComponent />;
}

export default ProfilePage;
