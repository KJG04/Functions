import { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { MainPageContainer } from "../container";

const MainRouter: FC = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={MainPageContainer} />
      </Switch>
    </>
  );
};

export default MainRouter;
