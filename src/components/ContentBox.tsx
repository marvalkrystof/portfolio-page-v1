import "../index.css";
import { ReactNode } from "react";
import { forwardRef } from "react";
import HeaderTag from "./HeaderTag";

const ContentBox = forwardRef<
  HTMLDivElement,
  { children: ReactNode; text: string }
>((props, ref) => {
  return (
    <>
      <div className="h-fit">
        <HeaderTag text={props.text}></HeaderTag>
        <div
          ref={ref}
          className="flex flex-wrap w-full mb-16 rounded-lg p-4 transition-all duration-200 hover:bg-content-background-hover"
        >
          {props.children}
        </div>
      </div>
    </>
  );
});

export default ContentBox;
