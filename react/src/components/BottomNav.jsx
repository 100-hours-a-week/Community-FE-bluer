import { useCallback } from "react";
import useRouteName from "@/hooks/route/useRouteName";
import DefaultBottomNav from "@/components/bottomNav/DefaultBottomNav";

function BottomNav() {
  const name = useRouteName();

  const renderHeaderByPath = useCallback(() => {
    if (name === "post-detail") {
      return <></>;
    }
    return <DefaultBottomNav />;
  }, [name]);

  return <>{renderHeaderByPath()}</>;
}

export default BottomNav;
