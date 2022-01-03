import { useLayoutEffect } from "react";
import { color } from "../Minesweeper";
import { ANDGate } from "./Gates";

const LogicGate = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.red;
  }, []);

  return (
    <>
      <div>hello world!</div>
      <ANDGate />
    </>
  );
};

export default LogicGate;
