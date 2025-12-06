import useRouteName from "@/hooks/route/useRouteName";
import DefaultBottomNav from "@/components/bottomNav/DefaultBottomNav";

function BottomNav() {
  const name = useRouteName();

  console.log(name);
  if (name === "") {
    return <></>;
  }
  return <DefaultBottomNav />;
}

export default BottomNav;
