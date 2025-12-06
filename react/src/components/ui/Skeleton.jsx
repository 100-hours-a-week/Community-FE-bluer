function Skeleton(props) {
  const { className } = props;

  return <div className={`animate-pulse rounded-full bg-gray-200 ${className}`} />;
}

export default Skeleton;
