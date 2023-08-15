import SearchBar from "@/components/searchBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="w-[90vw] h-full flex flex-col items-center justify-items-center">
        <SearchBar />
      </div>
    </main>
  );
}
