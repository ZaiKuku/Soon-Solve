import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { ProfileCard } from "@/components/userProfile";
import useProfile from "@/hooks/useProfile";
import { ProfileCardSkeleton } from "@/components/Skeleton/userProfileSkeleton";
import { SWRConfig } from "swr";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

function userProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [profileData, error, isLoading] = useProfile(id);

  const isLoadingProfile = useSelector(
    (state) => state.LoadingControl.isLoadingProfile
  );

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
          {isLoadingProfile || !profileData ? (
            <ProfileCardSkeleton />
          ) : (
            <ProfileCard profileData={profileData} />
          )}
        </div>
      </main>
    </SWRConfig>
  );
}

export default userProfile;

export async function getServerSideProps(context) {
  const { req } = context;
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: `/login`,
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
}
