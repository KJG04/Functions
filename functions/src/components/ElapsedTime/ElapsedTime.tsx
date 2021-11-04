import { useLayoutEffect, useState } from "react";

interface PropsType {
  interval: number;
  from: Date;
  isPlay: boolean;
}

const ElapsedTime = ({ interval, from, isPlay }: PropsType): JSX.Element => {
  const [timeString, setTimeString] = useState<string>("00:00:00");

  const onInterval = () => {
    if (isPlay) {
      const now = new Date();

      const seconds = Math.floor((now.getTime() - from.getTime()) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      setTimeString(
        `${hours.toString().padStart(2, "0")}:${(minutes % 60).toString().padStart(2, "0")}:${(
          seconds % 60
        )
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  useLayoutEffect(() => {
    const timeInterval = setInterval(onInterval, interval);

    return () => clearInterval(timeInterval);
  }, [from]);

  return <span>{timeString}</span>;
};

export default ElapsedTime;
