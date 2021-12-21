import { PublicApi, usePointToPointConstraint } from "@react-three/cannon";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { PointerEvent, RefObject, useCallback, useEffect, useRef } from "react";
import { Euler, Object3D, Vector3 } from "three";

const useDragConstraint = (
  child: RefObject<Object3D>,
  childApi: PublicApi,
  cursor: RefObject<Object3D>
) => {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });
  const isDrag = useRef(false);

  useEffect(() => void api.disable(), []);
  useFrame(() => {
    if (isDrag.current) {
      childApi.angularVelocity.set(30, 30, 30);
    }
  });

  const onPointerUp = useCallback(() => {
    isDrag.current = false;
    childApi.velocity.set(0, 0, 30);
    api.disable();
  }, []);

  const onPointerDown = useCallback((e) => {
    isDrag.current = true;
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    api.enable();
  }, []);

  return { onPointerUp, onPointerDown };
};

export default useDragConstraint;
