interface PropsType {
  text: string;
  style?: React.CSSProperties;
}

const AwesomeTextTransiton = ({ text, style }: PropsType) => {
  return <div style={style}>{text}</div>;
};

export default AwesomeTextTransiton;
