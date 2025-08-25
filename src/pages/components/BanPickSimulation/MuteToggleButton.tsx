import { Volume2, VolumeX } from "lucide-react";
import { useBanPickTimerStore } from "@/store/banPickTimerStore";

const MuteToggleButton = () => {
  const { isMuted, toggleMute } = useBanPickTimerStore();

  return (
    <button
      onClick={toggleMute}
      aria-label={isMuted ? "Unmute" : "Mute"}
      className="cursor-pointer"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-rose-400 cursor-pointer hover:opacity-70" />
      ) : (
        <Volume2 className="w-5 h-5 text-white cursor-pointer hover:opacity-70" />
      )}
    </button>
  );
};

export default MuteToggleButton;
