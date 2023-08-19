import { ListWithAvatar } from "@/components/notification";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { ListWithAvatar } from "@/components/ListWithAvatar";

export default function NotificationsPage() {
  return (
    <main className="w-full flex flex-col gap-2 items-center pt-[80px]">
      <Header />
      {/* <div className="w-[90%] flex flex-col gap-2 justify-center">
        <Notification />
      </div> */}
      <ListWithAvatar />
      <button
        style={{
          position: "absolute",
          bottom: "100px",
          left: "20px",
        }}
        onClick={() => {
          // Handle click event here
        }}
      >
        <ArrowBackIcon style={{ fontSize: "40px" }} />
      </button>
      <NavBar />
    </main>
  );
}
