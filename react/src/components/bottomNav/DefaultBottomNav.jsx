import { faPlus, faUser, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import BottomNavLinkButton from "@/components/bottomNav/BottomNavLinkButton";
import IconButton from "@/components/ui/IconButton";

function DefaultBottomNav() {
  return (
    <nav className="border-border-grey border-t-2 bg-white shadow-lg">
      <ul className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        <li className="flex flex-1 justify-center">
          <BottomNavLinkButton targetName={"post-list"} to={"/"} icon={faHome} />
        </li>

        <li className="flex flex-1 justify-center">
          <IconButton className="bg-button-bg-hover h-14 w-14" as={Link} to={"/posts/create"}>
            <FontAwesomeIcon icon={faPlus} size="lg" className="text-gray-400" />
          </IconButton>
        </li>

        <li className="flex flex-1 justify-center">
          <BottomNavLinkButton targetName={"user-info"} to={"/user/info"} icon={faUser} />
        </li>
      </ul>
    </nav>
  );
}

export default DefaultBottomNav;
