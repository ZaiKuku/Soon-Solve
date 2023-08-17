import Applicant from "@/components/Applicant";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
// import Tag from "@/components/tags";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <div className="w-[90%] flex flex-col gap-2 justify-center">
        <Applicant />
      </div>
      <NavBar />
    </main>
  );
}
