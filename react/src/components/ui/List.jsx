function List(props) {
  const { children, type = "ul", direction = "row", className = "" } = props;
  const Component = type; // 'ul' | 'ol'

  const flexDirection = direction === "row" ? "flex flex-row" : "flex flex-col";

  return <Component className={`${flexDirection} ${className}`}>{children}</Component>;
}

export default List;
