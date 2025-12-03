import { faPlus, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import useRouteName from "@/hooks/useRouteName";
import IconButton from "@/components/ui/IconButton";

function BottomNavLinkButton(props) {
  const { targetName, to, icon } = props;

  const routeName = useRouteName();

  return (
    <IconButton
      className={`flex-col gap-1 px-6 py-2 transition-all duration-300 ${
        routeName === targetName ? "text-gray-600" : "text-gray-400"
      }`}
      as={Link}
      to={to}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
    </IconButton>
  );
}

function BottomNav() {
  return (
    <nav className="border-t border-[#EBEBEB] bg-white shadow-lg">
      <ul className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        <li className="flex flex-1 justify-center">
          <BottomNavLinkButton targetName={"post-list"} to={"/"} icon={faHome} />
        </li>

        <li className="flex flex-1 justify-center">
          {/* TODO: 비회원이 클릭 시 모달 또는 로그인 */}
          <IconButton className="bg-button-bg-hover h-14 w-14" as={Link} to={"/posts/create"}>
            <FontAwesomeIcon icon={faPlus} size="lg" className="text-gray-400" />
          </IconButton>
        </li>

        <li className="flex flex-1 justify-center">
          {/* TODO: 비회원이 클릭 시 모달 또는 로그인 */}
          <BottomNavLinkButton targetName={"user-info"} to={"/user/info"} icon={faUser} />
        </li>
      </ul>
    </nav>
  );
}

export default BottomNav;
