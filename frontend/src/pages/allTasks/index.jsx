import SearchBar from "@/components/searchBar";
import TaskOverview from "@/components/TaskOverview";
// import OverviewGroup from "@/components/OverviewGroup";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
// import Tag from "@/components/tags";

export default function Home() {
  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      <SearchBar />
      <TaskOverview />
      <NavBar />
    </main>
  );
}
