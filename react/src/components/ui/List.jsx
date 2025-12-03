function List({ children, type = "ul", direction = "row", className = "" }) {
  const Component = type; // 'ul' | 'ol'

  const flexDirection = direction === "row" ? "flex flex-row" : "flex flex-col";

  return <Component className={`${flexDirection} ${className}`}>{children}</Component>;
}

export default List;
