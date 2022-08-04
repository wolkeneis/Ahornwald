import ReactPlayer from "react-player";
import { useAppSelector } from "../../../redux/hooks";

const VideoPlayer = () => {
  const sourceUrl: string = useAppSelector((state) => state.content.sourceUrl);

  return <>{sourceUrl && <ReactPlayer url={sourceUrl} />}</>;
};

export default VideoPlayer;
