function Center(props) {
  const { children, ...style } = props;

  return (
    <div className="flex h-full w-full items-center justify-center" style={style}>
      {children}
    </div>
  );
}

export default Center;
