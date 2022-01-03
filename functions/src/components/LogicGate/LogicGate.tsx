import { useLayoutEffect } from "react";
import { color } from "../Minesweeper";

const LogicGate = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  return (
    <>
      <div>hello world!</div>
    </>
  );
};

export default LogicGate;
