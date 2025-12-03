import { useCallback } from "react";
import useRouteName from "@/hooks/useRouteName";
import DefaultHeader from "@/components/header/DefaultHeader";

/**
 *
 *  post-list header -> 헤더 로고 및 드롭다운/로그인버튼 / A
 *  login -> default / B
 *  post-detail -> 백버튼, 로고, 드롭다운/로그인버튼 / A
 * post-create -> 백버튼/ 텍스트 / 드롭다운 로그인 버튼C
 * post-edit -> 백버튼 텍스트 드롭다운 로그인 버튼 C
 * user-info -> 백버튼, 로고, 드롭다운/로그인버튼 / A
 * change-password -> 백버튼 텍스트 드롭다운 로그인 버튼 C
 */
function Header() {
  const name = useRouteName();

  const renderHeaderByPath = useCallback(() => {
    console.log(`routename: ${name}`);
    return <DefaultHeader />;
    // TODO: render header by route
    /*
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
    if (name === "post-edit") {
      return <>post-edit-header</>;
    }
    if (name === "user-info") {
      return <>user-info</>;
    }
    if (name === "change-password") {
      return <>change-password</>;
    }
    return <DefaultHeader />;
    */
  }, [name]);

  return <>{renderHeaderByPath()}</>;
}

export default Header;
