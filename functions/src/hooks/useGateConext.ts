import { GateContext } from "../context/GateContext";
import { useContext } from "react";

const useGateContext = () => useContext(GateContext);

export default useGateContext;
