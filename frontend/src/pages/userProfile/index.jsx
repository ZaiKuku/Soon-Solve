import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { ProfileCard } from "@/components/userProfile";
import useProfile from "@/hooks/useProfile";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";

function userProfile() {
  const router = useRouter();
  const profileData = useProfile();
  console.log("profileData", profileData);
  return (
    <SWRConfig
      value={{
        onError: () => {
          router.reload();
        },
      }}
    >
      <main className="w-full flex flex-col gap-2 items-center pt-[80px] ">
        <Header />
        <div className="w-[90%] flex flex-col gap-2 items-center">
          <NavBar />
          <ProfileCard profileData={profileData} />
        </div>
      </main>
    </SWRConfig>
  );
}

export default userProfile;
