import { useCallback } from "react";
import useRouteName from "@/hooks/useRouteName";
import DefaultHeader from "@/components/layout/header/DefaultHeader";

function Header() {
  const name = useRouteName();

  const renderHeaderByPath = useCallback(() => {
    if (name === "post-list" || name === "/") {
      return <>posts header</>;
    }
    if (name === "login") {
      return <>login header</>;
    }
    if (name === "post-create") {
      return <>post-create</>;
    }
    if (name === "post-detail") {
      return <>post-detail-header</>;
    }
    if (name === "post-detail") {
      return <>post-edit-header</>;
    }
    if (name === "user-info") {
      return <>user-info</>;
    }
    if (name === "change-password") {
      return <>change-password</>;
    }
    return <DefaultHeader />;
  }, [name]);

  return <>{renderHeaderByPath()}</>;
}

export default Header;
