import * as S from "./styles";
import DarkLogo from "../../assets/logos/LogoDark.svg";
import LightLogo from "../../assets/logos/LogoLight.svg";
import { useState } from "react";
import CustomCursor from "../Main/CustomCursor/CustomCursor";
import { color } from "../../style/color";

const AlwaysOnDisplay = () => {
  const [isHover, setIsHover] = useState(false);
  const [scale, setScale] = useState(1);

  const onClickHandler = () => {
    setScale(420);
  };

  return (
    <>
      <S.LogoContainer
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClickHandler}
      >
        <S.Logo src={DarkLogo} isActive={false} />
        <S.Logo src={LightLogo} isActive={true} />
      </S.LogoContainer>
    </>
  );
};

export default AlwaysOnDisplay;
