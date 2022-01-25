import { createContext } from "react";

export type Point = [x: number, y: number];

export interface Dot {
  id: string;
  position: Point;
  connectNode: Node;
}

export interface Gate {
  id: string;
  type: string;
  position: Point;
  input1?: Dot;
  input2?: Dot;
  output?: Dot;
}

export interface Node {
  id: string;
  dot1: Dot;
  dot2: Dot;
  isActive: boolean;
}

export interface GateContextType {
  gates: Gate[];
  nodes: Node[];
  addNode: (startDotId: string, endDotId: string) => void;
  setNodeIsActive: (nodeId: string, isActive: boolean) => void;
  addGate: (type: string) => void;
}

export const GateContext = createContext<GateContextType>({
  gates: [],
  nodes: [],
  addNode: () => {},
  setNodeIsActive: () => {},
  addGate: () => {},
});
