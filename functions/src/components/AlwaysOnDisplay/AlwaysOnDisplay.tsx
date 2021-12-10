import * as S from "./styles";
import DarkLogo from "../../assets/logos/LogoDark.svg";
import LightLogo from "../../assets/logos/LogoLight.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const AlwaysOnDisplay = () => {
  const [scale, setScale] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const onLogoClickHandler = () => {
    if (isDark) {
      return;
    }

    setScale(420);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    const loc = location.pathname.replace("/", "");

    if (loc === "") {
      //main 일때
      setIsDark(true);
      setScale(0);
    } else {
      setIsDark(false);
    }
  }, [location]);

  return (
    <S.Container>
      <S.LogoContainer onClick={onLogoClickHandler}>
        <S.Logo src={LightLogo} isActive={true} />
        <S.Logo src={DarkLogo} isActive={isDark} />
        <S.Circle scale={scale} />
      </S.LogoContainer>
    </S.Container>
  );
};

export default AlwaysOnDisplay;
