import Link from "next/link";
import { useCookies } from "react-cookie";
import { Input, button } from "@material-tailwind/react";

function MessageSendBar() {
  const handeleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.message.value);
    // 清空輸入框
    e.target.message.value = "";
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-[83px] flex border-top border-t-2 bg-white border-[#B15E6C] ">
      <form
        className="w-full flex items-center jusfity-center px-10"
        onSubmit={handeleSubmit}
      >
        <Input
          label="Message"
          size="lg"
          className="h-[50px] text-lg"
          name="message"
          icon={
            <button type="submit">
              <i className="fa-solid fa-arrow-right fa-xl" />
            </button>
          }
        />
      </form>
    </div>
  );
}

export default MessageSendBar;
