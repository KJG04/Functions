import { PublicApi, Triplet, usePointToPointConstraint } from "@react-three/cannon";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { Object3D } from "three";

const useDragConstraint = (
  child: RefObject<Object3D>,
  childApi: PublicApi,
  cursor: RefObject<Object3D>,
  isDrag: React.MutableRefObject<boolean>
) => {
  const [, , api] = usePointToPointConstraint(cursor, child, {
    pivotA: [0, 0, 0],
    pivotB: [0, 0, 0],
  });

  const angularVelocity = useRef<Triplet>([0, 0, 0]);

  useEffect(() => void api.disable(), [api]);

  useEffect(() => {
    const unsubscribeAngularVelocity = childApi.angularVelocity.subscribe((v) => {
      angularVelocity.current = v;
    });

    return () => unsubscribeAngularVelocity();
  }, []);

  const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  };

  const onPointerUp = useCallback(() => {
    api.disable();

    const angularV = angularVelocity.current.map((value) => value + getRandomInt(-5, 5)) as Triplet;

    angularV[angularV.indexOf(Math.min(...angularV))] =
      angularV[angularV.indexOf(Math.min(...angularV))] +
      getRandomInt(5, 10) * Math.sign(angularV[angularV.indexOf(Math.min(...angularV))]);

    childApi.angularVelocity.set(...angularV);
    isDrag.current = false;
  }, [api]);

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      e.target.setPointerCapture(e.pointerId);
      api.enable();
      isDrag.current = true;
    },
    [api]
  );

  return { onPointerUp, onPointerDown };
};

export default useDragConstraint;
