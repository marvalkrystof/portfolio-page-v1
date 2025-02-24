import { RefObject, useEffect, useState } from "react";
import "../index.css";

interface NavButtonProps {
  text: string;
  targetElement: RefObject<HTMLDivElement>;
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

function SidebarNavButton(props: NavButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (props.targetElement.current) {
      observer.observe(props.targetElement.current); // Accessing `current` to pass the actual element
    }

    return () => {
      if (props.targetElement.current) {
        observer.unobserve(props.targetElement.current); // Clean up the observer on unmount
      }
    };
  }, [props.targetElement]);

  if (isVisible) {
    props.targetElement.current?.classList.add("bg-content-background-hover");
  } else {
    props.targetElement.current?.classList.remove(
      "bg-content-background-hover"
    );
  }

  return (
    <>
      <button
        className={`text-start text-base pl-3 pr-3 pt-1 pb-1 mt-5 border-l-2 rounded border-gray-500 text-white transition-transform duration-200
      ${
        isVisible
          ? "translate-x-10 text-opacity-100 border-white bg-content-background-hover"
          : "text-opacity-30"
      }
      hover:translate-x-10 hover:text-opacity-100 hover:border-white duration-300
    `}
        onClick={() => {
          props.targetElement.current?.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        {props.text}
      </button>
    </>
  );
}

export default SidebarNavButton;
