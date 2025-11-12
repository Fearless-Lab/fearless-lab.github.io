import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#050d18]">
      <Loader2 className="w-8 h-8 animate-spin text-sky-400 mb-3" />
      <p className="text-sm md:text-base text-gray-300">
        밴픽 시뮬레이션을 만드는 중이에요
      </p>
    </div>
  );
};

export default Loading;
