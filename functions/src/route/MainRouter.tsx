import { FC, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import AlwaysOnDisplay from "../components/AlwaysOnDisplay/AlwaysOnDisplay";
import { MainContainer, MinesweeperContainer, TestContainer } from "../container";

const MainRouter: FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/minesweeper" element={<MinesweeperContainer />} />
        <Route path="/test" element={<TestContainer />} />
      </Routes>
      <AlwaysOnDisplay />
    </>
  );
};

export default MainRouter;
