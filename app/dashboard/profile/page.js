import UserProfile from "@/app/components/UserProfile";
import { UserProfileProvider } from "@/app/context/UserProfileContext";

export default function UserProfileWrapper() {
    return (
      <UserProfileProvider>
        <UserProfile />
      </UserProfileProvider>
    );
  }