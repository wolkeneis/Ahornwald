import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, Button } from "@mui/material";
import { useDrag } from "@use-gesture/react";
import { v1 } from "moos-api";
import { useRef } from "react";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setBuffered,
  setDuration,
  setMuted,
  setPlaying,
  setTime,
  setTimePercent,
  setVolume
} from "../../../redux/playerSlice";

const VideoPlayer = () => {
  const sourceUrl: string = useAppSelector((state) => state.content.sourceUrl);

  const muted: boolean = useAppSelector((state) => state.player.muted);

  const mobile = useAppSelector((state) => state.interface.mobile);
  //const playlist = useSelector((state) => state.content.playlist);
  //const selectedEpisode = useSelector((state) => state.content.episode);
  const volume = useAppSelector((state) => state.player.volume);
  const playing = useAppSelector((state) => state.player.playing);
  const time = useAppSelector((state) => state.player.time);
  const timePercent = useAppSelector((state) => state.player.timePercent);
  const videoPlayer = useRef<ReactPlayer>(null);
  const idle = useRef(0);
  const moved = useRef(false);
  const inside = useRef(false);
  const dispatch = useAppDispatch();

  const onReady = () => {
    console.log("Ready");
    /*calculateHeight();
    if (roomId && !host) {
      setTimeout(() => {
        requestSync();
      }, 1000);
    }*/
  };

  const onProgress = (event: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    console.log("Brand");

    dispatch(setTime(event.playedSeconds));
    dispatch(setTimePercent(event.played));
    dispatch(setBuffered(event.loaded));
  };

  const onDuration = (duration: number) => {
    dispatch(setDuration(duration));
    if (time > 0) {
      videoPlayer.current?.seekTo(time, "seconds");
    }
  };

  const onError = () => {
    if (muted) {
      dispatch(setTime(0));
      dispatch(setDuration(0));
      dispatch(setTimePercent(0));
      dispatch(setBuffered(0));
      dispatch(setPlaying(false));
    } else {
      dispatch(setMuted(true));
    }
  };

  return (
    <>
      {sourceUrl && (
        <Box sx={{ position: "relative" }}>
          <ReactPlayer
            controls
            onProgress={(state) => console.log("Progress", state)}
            progressInterval={1000}
            url={sourceUrl}
          />
        </Box>
      )}
    </>
  );
};

const sync = () => {
  console.log("Wald");
};

const isTouchDevice = () => {
  return "ontouchstart" in window || (navigator as any).msMaxTouchPoints > 0 || navigator.maxTouchPoints > 0;
};

const VideoControls = () => {
  const currentCollection: v1.Collection | null | undefined = useAppSelector((state) => state.content.collection);
  const currentEpisode: v1.Episode | null | undefined = useAppSelector((state) => state.content.episode);
  //const selectedEpisode = useAppSelector((state) => state.content.episode);
  const visible: boolean = useAppSelector((state) => state.player.controls);
  const muted: boolean = useAppSelector((state) => state.player.muted);
  const dispatch = useAppDispatch();

  const findEpisode = (offset: number) => {
    const season = currentCollection?.seasons?.find((season) => season.id === currentEpisode?.seasonId);
    if (!season) {
      return;
    }
    return season.episodes.find((episode) => episode.index === currentEpisode?.index ?? 0 + offset);
  };

  const previousEpisode: v1.Episode | null = (currentEpisode && currentCollection && findEpisode(-1)) ?? null;
  const nextEpisode: v1.Episode | null = (currentEpisode && currentCollection && findEpisode(1)) ?? null;

  const unmute = () => dispatch(setMuted(false));

  return (
    <div className="VideoControls" style={visible || muted ? {} : { opacity: "0" }}>
      {muted && (
        <div className="AboveTimeline">
          <Button aria-label="Unmute Button" className="UnmuteButton" onClick={unmute} style={{}}>
            Unmute Audio
          </Button>
        </div>
      )}
      <div className="AboveTimeline">
        <LeftControlContainer nextEpisode={nextEpisode} previousEpisode={previousEpisode} />
        <RightControlContainer />
      </div>
      <Timeline />
    </div>
  );
};

const LeftControlContainer = ({
  previousEpisode,
  nextEpisode
}: {
  previousEpisode: v1.Episode | null;
  nextEpisode: v1.Episode | null;
}) => {
  const duration = useAppSelector((state) => state.player.duration);
  const time = useAppSelector((state) => state.player.time);
  const playing = useAppSelector((state) => state.player.playing);
  const selectedEpisode = useAppSelector((state) => state.content.episode);
  const dispatch = useAppDispatch();

  const parseTime = (time: number) => {
    return `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${Math.floor(time % 60)}`;
  };

  const playPrevious = () => {
    dispatch(
      setEpisode({
        playlist: selectedEpisode.playlist,
        language: selectedEpisode.language,
        season: selectedEpisode.season,
        key: previousEpisode.id,
        name: previousEpisode.name
      })
    );
    dispatch(setTime(0));
    dispatch(setPlaying(true));
    sync();
  };

  const playNext = () => {
    dispatch(
      setEpisode({
        playlist: selectedEpisode.playlist,
        language: selectedEpisode.language,
        season: selectedEpisode.season,
        key: nextEpisode.id,
        name: nextEpisode.name
      })
    );
    dispatch(setTime(0));
    dispatch(setPlaying(true));
    sync();
  };

  return (
    <div className="ControlContainer">
      {previousEpisode && (
        <Button onClick={playPrevious}>
          <SkipPreviousIcon />
        </Button>
      )}
      {playing ? (
        <Button
          onClick={() => {
            dispatch(setPlaying(false));
            sync();
          }}
        >
          <PauseIcon />
        </Button>
      ) : (
        <Button
          onClick={() => {
            dispatch(setPlaying(true));
            sync();
          }}
        >
          <PlayArrowIcon />
        </Button>
      )}
      {nextEpisode && (
        <Button onClick={playNext}>
          <SkipNextIcon />
        </Button>
      )}
      <p className="Time">
        {parseTime(time)} / {parseTime(duration)}
      </p>
    </div>
  );
};

const RightControlContainer = () => {
  return (
    <div className="ControlContainer">
      <VolumeChanger />
      {document.fullscreenElement === document.getElementById("video-wrapper") ? (
        <Button onClick={() => document.exitFullscreen()}>
          <FullscreenExitIcon />
        </Button>
      ) : (
        <Button onClick={() => document.getElementById("video-wrapper")?.requestFullscreen()}>
          <FullscreenIcon />
        </Button>
      )}
    </div>
  );
};

const VolumeChanger = () => {
  const mobile = useAppSelector((state) => state.interface.mobile);
  const volume = useAppSelector((state) => state.player.volume);
  const muted = useAppSelector((state) => state.player.muted);
  const dispatch = useAppDispatch();
  const slider = useRef<HTMLDivElement>(null);

  const bind = useDrag((state) => {
    if (slider.current) {
      const rect = slider.current.getBoundingClientRect();
      const relativeVolume = Math.min(Math.max((state.xy[0] - rect.x) / rect.width, 0), 1);
      dispatch(setVolume(relativeVolume));
    }
  }, {});

  return (
    <>
      {!mobile && !isTouchDevice() && (
        <div className="VolumeChanger">
          {muted || !volume ? <VolumeMuteIcon /> : volume > 0.5 ? <VolumeUpIcon /> : <VolumeDownIcon />}
          <div {...bind()} className="VolumeSlider" ref={slider}>
            <div className="Volume" style={{ backgroundSize: `${volume * 100}% 100%` }}></div>
            <div className="Thumb" style={{ left: `${volume * 100}%` }}></div>
          </div>
        </div>
      )}
    </>
  );
};

const Timeline = () => {
  const duration = useAppSelector((state) => state.player.duration);
  const played = useAppSelector((state) => state.player.played);
  const loaded = useAppSelector((state) => state.player.loaded);
  const dispatch = useAppDispatch();
  const timeline = useRef<HTMLDivElement>(null);

  const bind = useDrag((state) => {
    if (timeline.current && state.type !== "pointerup") {
      const rect = timeline.current.getBoundingClientRect();
      const relativeTime = Math.min(Math.max((state.xy[0] - rect.x) / rect.width, 0), 1);
      dispatch(setTime(relativeTime));
      dispatch(setTimePercent(relativeTime * duration));
    } else {
      sync();
    }
  }, {});

  return (
    <>
      <div {...bind()} className="Timeline" ref={timeline}>
        <div className="Buffered" style={{ backgroundSize: `${loaded * 100}% 100%` }}></div>
        <div className="Played" style={{ backgroundSize: `${played * 100}% 100%` }}></div>
        <div className="Thumb" style={{ left: `${played * 100}%` }}></div>
      </div>
    </>
  );
};

export default VideoPlayer;
