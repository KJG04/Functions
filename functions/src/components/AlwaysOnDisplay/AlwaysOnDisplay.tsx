import * as S from "./styles";
import DarkLogo from "../../assets/logos/LogoDark.svg";
import LightLogo from "../../assets/logos/LogoLight.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import StickyNav from "../StickyNav/StickyNav";
import { color } from "../../style/color";
import DarkGithub from "../../assets/icons/github_dark.svg";
import LightGithub from "../../assets/icons/github_light.svg";

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
      <StickyNav style={{ position: "absolute", left: "60px", bottom: "60px" }}>
        <S.GithubContainer
          href="https://github.com/KJG04/Functions"
          target="_blank"
          rel="noreferrer"
        >
          <S.GithubLink isActive={true}>
            <S.GithubLogo src={LightGithub} />
            <S.Github color={color.white}>Github</S.Github>
          </S.GithubLink>
          <S.GithubLink isActive={isDark}>
            <S.GithubLogo src={DarkGithub} />
            <S.Github color={color.black}>Github</S.Github>
          </S.GithubLink>
        </S.GithubContainer>
      </StickyNav>
    </S.Container>
  );
};

export default AlwaysOnDisplay;
