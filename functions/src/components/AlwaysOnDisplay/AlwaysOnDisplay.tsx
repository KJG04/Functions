import * as S from "./styles";
import DarkLogo from "../../assets/logos/LogoDark.svg";
import LightLogo from "../../assets/logos/LogoLight.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const AlwaysOnDisplay = () => {
  const [scale, setScale] = useState(0);
  const navigate = useNavigate();

  const onLogoClickHandler = () => {
    setScale(420);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <S.Container>
      <S.LogoContainer onClick={onLogoClickHandler}>
        <S.Logo src={DarkLogo} isActive={false} />
        <S.Logo src={LightLogo} isActive={true} />
        <S.Circle scale={scale} />
      </S.LogoContainer>
    </S.Container>
  );
};

export default AlwaysOnDisplay;
