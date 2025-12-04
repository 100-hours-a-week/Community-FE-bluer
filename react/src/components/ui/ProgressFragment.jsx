import Center from "@/components/ui/Center";
import CircularProgress from "@/components/ui/CircularProgress";

function ProgressFragment({ circleColor }) {
  return (
    <div className="relative mt-20 h-full min-h-[30px] w-full">
      <Center position="absolute" inset={0}>
        <CircularProgress size={30} thickness={2} color={circleColor ?? "#000"} />
      </Center>
    </div>
  );
}

export default ProgressFragment;
