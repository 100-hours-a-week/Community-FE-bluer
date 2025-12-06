import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Text from "@/components/ui/Text";

function UserInfoPageMenuItem(props) {
  const { to, menuName } = props;

  return (
    <Link to={to}>
      <div className="border-base-grey border-b">
        <div className="flex items-center justify-between py-4">
          <Text variant="title" size="sm">
            {menuName}
          </Text>
          <FontAwesomeIcon className="text-border-grey" icon={faAngleRight} />
        </div>
      </div>
    </Link>
  );
}

export default UserInfoPageMenuItem;
