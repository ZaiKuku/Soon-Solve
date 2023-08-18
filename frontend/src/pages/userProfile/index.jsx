import { useRouter } from "next/router";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { ProfileCard } from "@/components/userProfile";

function userProfile() {
  // const { mutate, isLoading, isEnd, size, setSize, task_Data } =
  //   useTaskRecord();
  // useInfiniteScroll(async () => setSize(size + 1), 200);

  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px] ">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 items-center">
        <NavBar />
        <ProfileCard />
      </div>
    </main>
  );
}

export default userProfile;
