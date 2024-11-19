import {
  User,
  StreamVideo,
  StreamVideoClient,
  StreamCall,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LiveStreamUI } from "./LiveStreamUI";

const apiKey = import.meta.env.VITE_APIKEY;
const token = import.meta.env.VITE_TOKEN;
const callId = import.meta.env.VITE_CALLID;
const userId = import.meta.env.VITE_USERID;

const user: User = {
  id: userId,
  name: userId,
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);

call.camera.disable();
call.microphone.disable();

call.join({ create: true });

export default function LiveStream() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LiveStreamUI/>
      </StreamCall>
    </StreamVideo>
  );
}
