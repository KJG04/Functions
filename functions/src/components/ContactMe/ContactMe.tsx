import { useEffect } from "react";
import Light from "../../assets/props/Light.svg";
import { color } from "../Minesweeper";
import * as S from "./styles";

const ContactMe = () => {
  useEffect(() => {
    document.querySelector("html")!.style.backgroundColor = color.darkGray;
  }, []);

  return <S.LightImg src={Light} />;
};

export default ContactMe;
