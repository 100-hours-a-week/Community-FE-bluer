function CircularProgress(props) {
  const { size = 32, thickness = 3, color = "#3b82f6" } = props;

  return (
    <div
      className="inline-block animate-spin rounded-full border-solid"
      style={{
        width: size,
        height: size,
        borderWidth: thickness,
        borderColor: `${color} ${color} transparent`,
      }}
    />
  );
}

export default CircularProgress;
