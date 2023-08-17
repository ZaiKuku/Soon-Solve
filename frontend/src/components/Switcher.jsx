import { useState } from "react";

export default function Switcher() {
  const [active, setActive] = useState("Accepted");
  console.log(active);
  const toggleAccepted = () => {
    if (active === "Accepted") return;
    setActive("Accepted");
  };

  const toggleReleased = () => {
    if (active === "Released") return;
    setActive("Released");
  };
  return (
    <ul className="flex justify-between w-full top-[75px] left-0 right-0 fixed">
      <li
        className="w-[50%] flex flex-col items-center"
        onClick={toggleReleased}
        style={{ fontFamily: '"Noto Sans TC", Courier, monospace' }}
      >
        Released
        {active === "Released" && (
          <hr className="w-[70%] border-2 border-[#B15E6C]" />
        )}
      </li>
      <li
        className="w-[50%] flex flex-col items-center"
        onClick={toggleAccepted}
        style={{ fontFamily: '"Noto Sans TC", Courier, monospace' }}
      >
        Accepted
        {active === "Accepted" && (
          <hr className="w-[70%] border-2 border-[#B15E6C]"></hr>
        )}
      </li>
    </ul>
  );
}
