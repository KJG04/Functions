import * as S from "./styles";
import DarkLogo from "../../assets/logos/LogoDark.svg";
import LightLogo from "../../assets/logos/LogoLight.svg";

const AlwaysOnDisplay = () => {
  return (
    <S.LogoContainer>
      <S.Logo src={DarkLogo} isActive={false} />
      <S.Logo src={LightLogo} isActive={true} />
    </S.LogoContainer>
  );
};

export default AlwaysOnDisplay;
