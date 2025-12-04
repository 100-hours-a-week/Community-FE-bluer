import { faHeart as normalHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { faChartColumn, faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@/components/ui/avatar";
import IconButton from "@/components/ui/IconButton";
import Image from "@/components/ui/Image";
import List from "@/components/ui/List";
import Text from "@/components/ui/Text";

function PostStatItem(props) {
  const { iconElement, count, className } = props;

  return (
    <li className={`flex h-9 items-center gap-x-1 p-2 ${className}`}>
      {iconElement}
      <Text>{count > 0 && count}</Text>
    </li>
  );
}

function PostItem(props) {
  const {
    authorName,
    authorProfileImageUrl,
    commentCount,
    content,
    createdAt,
    likeCount,
    // TODO: get data from another api
    isLike = false,
    viewCount,
    postImageUrl,
    // title,
    toggleLike,
  } = props;
  // TODO: API 연동 시 state 값 정리

  return (
    <div className="border-border-grey border border-t-0 border-r-0 border-l-0 p-3">
      <div className="grid grid-cols-[48px_minmax(0,1fr)]">
        <Avatar size={"md"} className="row-span-3" imgUrl={authorProfileImageUrl} />
        <div className="col-start-2 row-start-1 flex gap-x-1.5 self-start">
          <Text variant={"title"}>{authorName}</Text>
          <time>
            <Text variant={"caption"} className="text-text-secondary">
              {/* TODO: formatting */}
              {createdAt}
            </Text>
          </time>
        </div>
        <div className="col-start-2 row-start-2 row-end-3">
          <div>
            <Text variant={"body"} size="md">
              {content}
            </Text>
          </div>
          {postImageUrl && (
            <div className="mt-2">
              <Image
                src={postImageUrl}
                fit="cover"
                maxHeight="360px"
                className="max-w-[80%] rounded-2xl border border-gray-200"
              />
            </div>
          )}
          <div className="mt-2">
            <List className="items-center">
              <PostStatItem
                className={"hover:bg-button-bg-hover rounded-xl hover:cursor-pointer"}
                onClick={toggleLike}
                iconElement={
                  <IconButton>
                    {isLike ? (
                      <FontAwesomeIcon icon={solidHeart} />
                    ) : (
                      <FontAwesomeIcon icon={normalHeart} />
                    )}
                  </IconButton>
                }
                count={likeCount}
              />
              <PostStatItem
                iconElement={<FontAwesomeIcon icon={faComment} />}
                count={commentCount}
              />
              <PostStatItem
                iconElement={<FontAwesomeIcon icon={faChartColumn} />}
                count={viewCount}
              />
            </List>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
