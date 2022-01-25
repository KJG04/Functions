import LogicGate from "../../components/LogicGate/LogicGate";
import GateContextProvider from "../../components/Providers/GateContextProvider";

const LogicGateContainer = () => {
  return (
    <GateContextProvider>
      <LogicGate />
    </GateContextProvider>
  );
};

export default LogicGateContainer;
