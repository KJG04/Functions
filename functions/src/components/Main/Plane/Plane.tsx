import { PlaneProps, usePlane } from "@react-three/cannon";
import { MeshPhongMaterialProps } from "@react-three/fiber";

type OurPlaneProps = Pick<MeshPhongMaterialProps, "color"> &
  Pick<PlaneProps, "position" | "rotation">;

const Plane = ({ color, ...props }: OurPlaneProps) => {
  const [ref] = usePlane(() => ({ ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry args={[1000, 1000]} />
      <meshPhongMaterial color={color} />
    </mesh>
  );
};

export default Plane;
