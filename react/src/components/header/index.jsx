import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

import useLoggedInUser from "@/contexts/useLoggedInUser";
import { Z_INDEX } from "@/lib/constants";
import Avatar from "@/components/ui/avatar";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import Skeleton from "@/components/ui/Skeleton";
import Text from "@/components/ui/Text";

function Header() {
  const navigate = useNavigate();
  const { user, isLoading } = useLoggedInUser();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header
      className={`h-header-height border-border-grey fixed z-${Z_INDEX.HEADER} grid w-full max-w-(--maxwidth-app-layout) grid-cols-[1fr_32px_1fr] grid-rows-[1fr] border-b-2`}
    >
      {/* Left */}
      <IconButton className="w-14" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </IconButton>

      {/* Center */}
      <div className="center flex">
        <div className="flex h-full items-center">
          <div className="h-8">
            <Link to={{ pathname: "/" }}>
              <img className="h-full" src="/logo.png" />
            </Link>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="center flex items-center justify-end pr-3">
        {isLoading ? (
          <Skeleton className={"h-10 w-10"} />
        ) : user ? (
          <Link to={"/user/info"}>
            <Avatar imgUrl={user.profileImageUrl} />
          </Link>
        ) : (
          <Button as={Link} to={"/login"} className="h-[34px]">
            <Text className="text-base-white" size={"md"}>
              로그인
            </Text>
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;
