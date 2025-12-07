import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import useRouteName from "@/hooks/route/useRouteName";
import IconButton from "@/components/ui/IconButton";

function BottomNavLinkButton(props) {
  const { targetName, to, icon } = props;

  const routeName = useRouteName();

  return (
    <IconButton
      className={`flex-col gap-1 px-6 py-2 transition-all duration-300 ${
        routeName === targetName ? "text-(--color-base-black)" : "text-gray-400"
      }`}
      as={Link}
      to={to}
    >
      <FontAwesomeIcon icon={icon} size="xl" />
    </IconButton>
  );
}

export default BottomNavLinkButton;
