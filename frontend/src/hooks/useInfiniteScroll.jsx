import { useEffect, useState } from "react";

export default function useInfiniteScroll(callback, distance) {
  const [isNearToBottom, setIsNearToBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight - distance
      ) {
        setIsNearToBottom(true);
      }
    }

    window.addEventListener("scroll", handleScroll);

    if (isNearToBottom) {
      (async () => {
        await callback();
        setIsNearToBottom(false);
      })();
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNearToBottom]);
}
