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
    <div>
      <nav>
        <ul className="flex justify-between w-full">
          <li
            className="w-[50%] flex flex-col items-center"
            onClick={toggleReleased}
          >
            Released
            {active === "Released" && (
              <hr className="w-[70%] border-2 border-[#B15E6C]" />
            )}
          </li>
          <li
            className="w-[50%] flex flex-col items-center"
            onClick={toggleAccepted}
          >
            Accepted
            {active === "Accepted" && (
              <hr className="w-[70%] border-2 border-[#B15E6C]"></hr>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
