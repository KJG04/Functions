import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import useDragConstraint from "../../../hooks/useDragConstraint";
import { color } from "../../Minesweeper";

const DiceRender = () => {
  const boxSize: Triplet = [1, 1, 1];
  const sizeOffset = 2;
  const circleArgs: [number, number] = [1 * 0.1, 100];

  const [cursorRef, cursorApi] = useSphere(() => ({
    type: "Static",
    args: [0.5],
    position: [0, 0, 10000],
    collisionFilterMask: 100,
  }));

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: boxSize.map((value) => value * sizeOffset) as Triplet,
    linearDamping: 0.9,
    angulardamping: 1.99,
    position: [0, 0, 0],
  }));
  const bind = useDragConstraint(ref, api, cursorRef);

  const angularVelocity = useRef<Triplet>([1, 0, 0]);
  const velocity = useRef<Triplet>([1, 0, 0]);
  const falseCount = useRef<number>(0);

  const [isRoll, setIsRoll] = useState<boolean>(true);

  const isRolling = useCallback((): boolean => {
    const v = velocity.current.map((v) => Math.ceil(v * 100) / 100);
    const a = angularVelocity.current.map((v) => Math.ceil(v * 100) / 100);

    return v.some((value) => Math.abs(value) >= 0.1) || a.some((value) => Math.abs(value) >= 0.1);
  }, []);

  const checkDiceIsRolling = useCallback(() => {
    //멈춰있는지 확인한다.
    const presentState = isRolling();
    const prevState = isRoll;

    if (presentState !== prevState) {
      //현재 상태와 이전 상태가 다를때
      let isChange = false;

      if (!presentState) {
        //현재 상태가 false이면 falseCount의 값을 올린다.
        const maxFrame = 30;
        if (falseCount.current > maxFrame) {
          //만약 falseCount 값이 count보다 크면 그때 isRoll 값을 false로 하고 falseCount는 0으로 한다.
          setIsRoll(false);
          isChange = true;
          falseCount.current = 0;
        } else {
          falseCount.current = falseCount.current + 1;
        }
      }

      if (!isChange) {
        setIsRoll(true);
      }
    }
  }, [isRoll, isRolling]);

  useFrame((e) => {
    //커서 위치를 매 프레임 설정한다.
    const x = e.mouse.x * e.viewport.width;
    const y = (e.mouse.y * e.viewport.height) / 1.9 + -x / 3.5;

    cursorApi.position.set(x / 1.4, y, 0);

    checkDiceIsRolling();
  });

  useEffect(() => {
    console.log("dice is rolling? : ", isRoll);
  }, [isRoll]);

  useEffect(() => {
    //각속도값과 이동속도값을 가지기 위해 subscribe를 통해 가져온다.
    const unsubscribeAngularVelocity = api.angularVelocity.subscribe((v) => {
      angularVelocity.current = v;
    });
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      velocity.current = v;
    });

    return () => {
      //dice가 없어지면 속도값을 구할 필요가 없기 때문에 unsubscribe한다.
      unsubscribeAngularVelocity();
      unsubscribeVelocity();
    };
  }, []);

  const resetDicePosition = useCallback(() => {
    api.position.set(0, 0, 0);
  }, [api]);

  return (
    <>
      <group ref={ref} scale={new Vector3(sizeOffset, sizeOffset, sizeOffset)} {...bind}>
        <mesh castShadow receiveShadow>
          <boxBufferGeometry attach="geometry" />
          <meshLambertMaterial attach="material" color={color.white} />
        </mesh>

        {/* 1 */}
        <group position={[0, 0, 0.51]}>
          <mesh>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 6 */}
        <group position={[0, 0, -0.51]} rotation={[Math.PI, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 3 */}
        <group position={[0, 0.51, 0]} rotation={[Math.PI / -2, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 4 */}
        <group position={[0, -0.51, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 2 */}
        <group position={[0.51, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>

        {/* 5 */}
        <group position={[-0.51, 0, 0]} rotation={[0, Math.PI / -2, 0]}>
          <mesh>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[-0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, -0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
          <mesh position={[0.3, 0.3, 0]}>
            <circleBufferGeometry attach="geometry" args={circleArgs} />
            <meshLambertMaterial attach="material" color={color.black} />
          </mesh>
        </group>
      </group>
      <mesh ref={cursorRef} />
    </>
  );
};

export default DiceRender;
