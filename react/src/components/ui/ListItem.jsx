function ListItem(props) {
  const { children, type = "li", className = "", ...others } = props;

  const Component = type;

  return (
    <Component className={className} {...others}>
      {children}
    </Component>
  );
}

export default ListItem;
