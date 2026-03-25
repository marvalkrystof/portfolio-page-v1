interface HeaderTag {
  text: string;
}

function HeaderTag(props: HeaderTag) {
  return (
    <>
      <div className="md:hidden flex w-full h-14 pl-4 sticky top-0 bg-background-opacity items-center backdrop-blur-xl">
        <div>{props.text}</div>
      </div>
    </>
  );
}

export default HeaderTag;
