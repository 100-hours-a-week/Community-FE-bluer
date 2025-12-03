import PostItem from "@/components/item/Posttem";
import List from "@/components/ui/List";

function PostListPage() {
  return (
    <>
      <List direction="column">
        <PostItem />
        <PostItem />
        <PostItem imgUrl={"/public/logo.png"} />
        <PostItem />
        <PostItem />
      </List>
    </>
  );
}

export default PostListPage;
