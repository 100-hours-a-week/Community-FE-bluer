import { faHeart as normalHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faChartColumn,
  faEllipsis,
  faHeart as solidHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatToLocalDateTime } from "@/utils/date";
import Avatar from "@/components/ui/Avatar";
import IconButton from "@/components/ui/IconButton";
import Image from "@/components/ui/Image";
import List from "@/components/ui/List";
import Text from "@/components/ui/Text";
import { Dropdown } from "../ui/Dropdown";

function PostStatItem(props) {
  const { iconElement, count, className, onClick } = props;

  return (
    <li className={`flex h-9 items-center gap-x-1 p-2 ${className}`} onClick={onClick}>
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
    likedByMe = false,
    viewCount,
    postImageUrl,
    onClickLike,
    onClickModify,
    onClickDelete,
    showDropdown,

    // type: post || postDetail || comment
    type,

    itemId,
  } = props;

  const handleClickModify = () => {
    if (!onClickModify) {
      return;
    }

    onClickModify(content, itemId);
  };

  const handleClickDelete = () => {
    if (type === "comment") {
      onClickDelete(itemId);
      return;
    }
    if (type === "postDetail") {
      onClickDelete();
      return;
    }
  };

  return (
    <div
      className={`border-border-grey border border-t-0 border-r-0 border-l-0 p-3 ${type === "post" ? "hover:cursor-pointer" : ""}`}
    >
      <div className="grid grid-cols-[48px_minmax(0,1fr)]">
        <Avatar size={"md"} className="row-span-3" imgUrl={authorProfileImageUrl} />
        <div className="col-start-2 row-start-1 flex justify-between">
          <div className="flex gap-x-1.5 self-start">
            <Text variant={"title"}>{authorName}</Text>
            {createdAt && (
              <time>
                <Text variant={"caption"} className="text-text-secondary">
                  {formatToLocalDateTime(createdAt)}
                </Text>
              </time>
            )}
          </div>
          {showDropdown && (
            <div
              className="relative"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <Dropdown direction="right" className="top-[-4px]">
                <Dropdown.Trigger asChild>
                  <IconButton
                    className={"hover:bg-button-bg-hover rounded-xl p-2 hover:cursor-pointer"}
                  >
                    <FontAwesomeIcon icon={faEllipsis} />
                  </IconButton>
                </Dropdown.Trigger>
                <Dropdown.List>
                  <Dropdown.Item onClick={handleClickModify}>수정하기</Dropdown.Item>
                  <Dropdown.Item onClick={handleClickDelete}>삭제하기</Dropdown.Item>
                </Dropdown.List>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="col-start-2 row-start-2 row-end-3">
          <div>
            <Text variant={"body"} size="md">
              {content}
            </Text>
          </div>
          {type !== "comment" && (
            <>
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
                    onClick={(event) => {
                      event.stopPropagation();
                      onClickLike?.();
                    }}
                    iconElement={
                      <IconButton>
                        {likedByMe ? (
                          <FontAwesomeIcon icon={solidHeart} />
                        ) : (
                          <FontAwesomeIcon icon={normalHeart} />
                        )}
                      </IconButton>
                    }
                    count={likeCount}
                  />
                  <PostStatItem
                    className={"hover:bg-button-bg-hover rounded-xl hover:cursor-pointer"}
                    iconElement={<FontAwesomeIcon icon={faComment} />}
                    count={commentCount}
                  />
                  <PostStatItem
                    iconElement={<FontAwesomeIcon icon={faChartColumn} />}
                    count={viewCount}
                  />
                </List>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostItem;
