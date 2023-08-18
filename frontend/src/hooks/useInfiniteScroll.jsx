import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback, threshold) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceToBottom <= threshold && !isLoading) {
      setIsLoading(true);
    }
  }, [threshold, isLoading]);

  useEffect(() => {
    const handleScrollThrottled = () => {
      // Using throttle to avoid excessive callback calls during scroll
      const timeout = setTimeout(() => {
        handleScroll();
        clearTimeout(timeout);
      }, 1000);
    };

    window.addEventListener("scroll", handleScrollThrottled);

    return () => {
      window.removeEventListener("scroll", handleScrollThrottled);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isLoading) {
      // Call the callback function when isLoading is true
      callback()
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [isLoading, callback]);
};

export default useInfiniteScroll;
