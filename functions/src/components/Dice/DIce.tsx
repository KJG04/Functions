import { useLayoutEffect } from "react";
import { color } from "../../style/color";

const Dice = () => {
  useLayoutEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.lightBlue;
  }, []);

  return <div>hello world!</div>;
};

export default Dice;
