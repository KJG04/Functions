import { FC, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import AlwaysOnDisplay from "../components/AlwaysOnDisplay/AlwaysOnDisplay";
import {
  ContactMeContainer,
  DiceContainer,
  MainContainer,
  MinesweeperContainer,
  TestContainer,
  LogicGateContainer,
} from "../container";

const MainRouter: FC = (): JSX.Element => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainContainer />} />
        <Route path="/minesweeper" element={<MinesweeperContainer />} />
        <Route path="/contact" element={<ContactMeContainer />} />
        <Route path="/dice" element={<DiceContainer />} />
        <Route path="/logicgate" element={<LogicGateContainer />} />
        <Route path="/test" element={<TestContainer />} />
      </Routes>
      <AlwaysOnDisplay />
    </>
  );
};

export default MainRouter;
