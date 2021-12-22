import { PublicApi, usePointToPointConstraint } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { Object3D } from "three";

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

  useFrame((e) => {
    if (isDrag.current) {
      const t = e.clock.getElapsedTime();
      const sin = Math.sin(t + Math.PI * 2) * 20;
      const cos = Math.cos(t) * 20;
      childApi.rotation.set(sin, cos, cos);
      childApi.angularVelocity.set(sin, cos, cos);
    }
  });

  const onPointerUp = useCallback(() => {
    isDrag.current = false;
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
