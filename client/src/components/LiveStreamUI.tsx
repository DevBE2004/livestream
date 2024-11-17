import {
  ParticipantView,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

export const LiveStreamUI = () => {
  const call = useCall(),
    { useIsCallLive, useLocalParticipant, useParticipantCount } =
      useCallStateHooks();

  const isCallLive = useIsCallLive();
  const localParticipant = useLocalParticipant();
  const totalParticipants = useParticipantCount();

  const toggleLiveStatus = () => {
    console.log("Toggling live status. Current state:", isCallLive);
    if (isCallLive) {
      call?.stopLive();
      console.log("Stopping live...");
    } else {
      call?.goLive();
      console.log("Starting live...");
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>Live: {totalParticipants}</div>
      <div>
        {localParticipant && (
          <ParticipantView
            participant={localParticipant}
            ParticipantViewUI={null}
          />
        )}
      </div>
      <div>
        <button onClick={toggleLiveStatus}>
          {isCallLive ? "Stop Live" : "Start Live"}
        </button>
      </div>
    </div>
  );
};
