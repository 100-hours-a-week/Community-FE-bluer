import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import Text from "@/components/ui/Text";

function DefaultHeader() {
  return (
    <header className="h-header-height fixed grid max-w-(--maxwidth-app-layout) grid-cols-[1fr_32px_1fr] grid-rows-[1fr] border">
      {/* Left */}
      <div className="flex w-14 items-center justify-center">
        <FontAwesomeIcon icon={faArrowLeft} size="xl" />
      </div>
      {/* Center */}
      <div className="center flex">
        <div className="flex h-full items-center">
          <div className="h-8">
            <Link to={{ pathname: "/" }}>
              <img className="h-full" src="/public/logo.png" />
            </Link>
          </div>
        </div>
      </div>
      {/* right */}
      <div className="center flex items-center justify-end pr-3">
        <Button className="h-[34px]">
          <Text className="text-base-white" size={"md"}>
            로그인
          </Text>
        </Button>
      </div>
    </header>
  );
}

export default DefaultHeader;
