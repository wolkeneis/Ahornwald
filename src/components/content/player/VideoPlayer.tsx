import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Box, Button, Slider, Typography } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { setCurrentEpisode } from "../../../redux/contentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setBuffered,
  setControlsVisible,
  setDuration,
  setMuted,
  setPlaying,
  setTime,
  setTimePercent,
  setVolume
} from "../../../redux/playerSlice";
import useInterval from "../../useInterval";

const VideoPlayer = () => {
  const sourceUrl: string = useAppSelector((state) => state.content.sourceUrl);
  const muted: boolean = useAppSelector((state) => state.player.muted);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const volume = useAppSelector((state) => state.player.volume);
  const playing = useAppSelector((state) => state.player.playing);
  const time = useAppSelector((state) => state.player.time);
  const controlsVisible: boolean = useAppSelector((state) => state.player.controls);
  const videoPlayer = useRef<ReactPlayer>(null);
  const idle = useRef(0);
  const moved = useRef(false);
  const inside = useRef(false);
  const dispatch = useAppDispatch();

  useInterval(() => {
    if (moved.current || !playing) {
      if (!controlsVisible && inside.current) {
        dispatch(setControlsVisible(true));
        idle.current = 0;
      }
    } else {
      if (controlsVisible) {
        idle.current = idle.current + 500;
      }
    }
    if (idle.current >= (mobile || isTouchDevice() ? 3500 : 2500)) {
      dispatch(setControlsVisible(false));
      idle.current = 0;
    }
    moved.current = false;
  }, 500);

  useEffect(() => {
    if (videoPlayer.current) {
      const currentTime = videoPlayer.current.getCurrentTime();
      if (currentTime > time + 0.25 || currentTime < time - 0.25) {
        videoPlayer.current.seekTo(time, "seconds");
        idle.current = 0;
      }
    }
  }, [time]);

  useEffect(() => {
    dispatch(setTime(0));
    dispatch(setDuration(0));
    dispatch(setTimePercent(0));
    dispatch(setBuffered(0));
    dispatch(setPlaying(true));
  }, [sourceUrl]);

  const showControls = () => {
    idle.current = 0;
    inside.current = true;
    dispatch(setControlsVisible(true));
  };

  const hideControls = () => {
    idle.current = 0;
    inside.current = false;
    if (playing) {
      dispatch(setControlsVisible(false));
    }
  };

  const onProgress = (event: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
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
        <Box
          id="video-player"
          onMouseEnter={showControls}
          onMouseLeave={hideControls}
          onMouseMove={() => (moved.current = true)}
          sx={{ position: "relative", cursor: controlsVisible ? "default" : "none", marginBottom: 3 }}
        >
          <ReactPlayer
            height="100%"
            muted={muted}
            onDuration={onDuration}
            onError={onError}
            onProgress={onProgress}
            playing={playing}
            progressInterval={250}
            ref={videoPlayer}
            url={sourceUrl}
            volume={volume}
            width="100%"
          />
          <VideoControls />
        </Box>
      )}
    </>
  );
};

const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const VideoControls = () => {
  const currentCollection: v1.Collection | null | undefined = useAppSelector((state) => state.content.collection);
  const currentEpisode: v1.Episode | null | undefined = useAppSelector((state) => state.content.episode);
  const visible: boolean = useAppSelector((state) => state.player.controls);
  const muted: boolean = useAppSelector((state) => state.player.muted);
  const dispatch = useAppDispatch();

  const findEpisode = (offset: number) => {
    const season = currentCollection?.seasons?.find((season) => season.id === currentEpisode?.seasonId);
    if (!season) {
      return;
    }
    return season.episodes.find((episode) => episode.index === (currentEpisode?.index ?? 0) + offset);
  };

  const previousEpisode: v1.Episode | null = (currentEpisode && currentCollection && findEpisode(-1)) ?? null;
  const nextEpisode: v1.Episode | null = (currentEpisode && currentCollection && findEpisode(1)) ?? null;

  console.log(previousEpisode, nextEpisode);

  const unmute = () => dispatch(setMuted(false));

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        background: "linear-gradient(to top, black , transparent)",
        width: "100%",
        padding: 2,
        paddingTop: 0,
        opacity: visible || muted ? 1 : 0,
        display: "flex",
        flexDirection: "column",
        transition: "opacity 300ms ease",
        zIndex: 1
      }}
    >
      {muted && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Button aria-label="Unmute Button" onClick={unmute} style={{}}>
            Unmute Audio
          </Button>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <LeftControlContainer nextEpisode={nextEpisode} previousEpisode={previousEpisode} />
        <RightControlContainer />
      </Box>
      <Timeline />
    </Box>
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
  const dispatch = useAppDispatch();

  const parseTime = (time: number) => {
    return `${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${Math.floor(time % 60)}`;
  };

  const playPrevious = (previousEpisode: v1.Episode) => {
    dispatch(setCurrentEpisode(previousEpisode));
    dispatch(setTime(0));
    dispatch(setPlaying(true));
  };

  const playNext = (nextEpisode: v1.Episode) => {
    dispatch(setCurrentEpisode(nextEpisode));
    dispatch(setTime(0));
    dispatch(setPlaying(true));
  };

  return (
    <Box
      sx={{
        padding: 0.5,
        gap: 0.25,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      {previousEpisode && (
        <Button onClick={() => playPrevious(previousEpisode)}>
          <SkipPreviousIcon />
        </Button>
      )}
      {playing ? (
        <Button onClick={() => dispatch(setPlaying(false))}>
          <PauseIcon />
        </Button>
      ) : (
        <Button onClick={() => dispatch(setPlaying(true))}>
          <PlayArrowIcon />
        </Button>
      )}
      {nextEpisode && (
        <Button onClick={() => playNext(nextEpisode)}>
          <SkipNextIcon />
        </Button>
      )}
      <Typography variant="subtitle1">
        {parseTime(time)} / {parseTime(duration)}
      </Typography>
    </Box>
  );
};

const RightControlContainer = () => {
  return (
    <Box
      sx={{
        padding: 0.5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <VolumeChanger />
      {document.fullscreenElement === document.getElementById("video-player") ? (
        <Button onClick={() => document.exitFullscreen()}>
          <FullscreenExitIcon />
        </Button>
      ) : (
        <Button onClick={() => document.getElementById("video-player")?.requestFullscreen()}>
          <FullscreenIcon />
        </Button>
      )}
    </Box>
  );
};

const VolumeChanger = () => {
  const [hoverIcon, setHoverIcon] = useState(false);
  const [hoverSlider, setHoverSlider] = useState(false);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const volume = useAppSelector((state) => state.player.volume);
  const muted = useAppSelector((state) => state.player.muted);
  const dispatch = useAppDispatch();
  const iconTimeout = useRef<NodeJS.Timeout | null>(null);
  const sliderTimeout = useRef<NodeJS.Timeout | null>(null);

  const onHoverIcon = () => {
    setHoverIcon(true);
    if (iconTimeout.current) {
      clearTimeout(iconTimeout.current);
    }
  };

  const onHoverSlider = () => {
    setHoverSlider(true);
    if (sliderTimeout.current) {
      clearTimeout(sliderTimeout.current);
    }
  };

  return (
    <>
      {!mobile && !isTouchDevice() && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column-reverse"
          }}
        >
          <Button
            onMouseEnter={onHoverIcon}
            onMouseLeave={() => (iconTimeout.current = setTimeout(() => setHoverIcon(false), 500))}
            onMouseOver={onHoverIcon}
          >
            {muted || !volume ? <VolumeMuteIcon /> : volume > 0.5 ? <VolumeUpIcon /> : <VolumeDownIcon />}
          </Button>
          {(hoverIcon || hoverSlider) && (
            <Box
              onMouseEnter={onHoverSlider}
              onMouseLeave={() => (sliderTimeout.current = setTimeout(() => setHoverSlider(false), 500))}
              onMouseOver={onHoverSlider}
              sx={{
                position: "absolute",
                transform: "translateY(-100%)"
              }}
            >
              <Slider
                aria-label="Volume"
                max={1}
                min={0}
                onChange={(_event, value) => dispatch(setVolume((value as number) === null ? volume : value))}
                orientation="vertical"
                size="small"
                step={0.01}
                sx={{
                  bottom: 0,
                  height: 50
                }}
                value={volume}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

const Timeline = () => {
  const duration = useAppSelector((state) => state.player.duration);
  const playedPercent = useAppSelector((state) => state.player.timePercent);
  const dispatch = useAppDispatch();

  const onSeek = (value: number) => {
    dispatch(setTime(value * duration));
    dispatch(setTimePercent(value));
  };

  return (
    <Box sx={{ marginX: 2 }}>
      <Slider
        aria-label="Volume"
        max={1}
        min={0}
        onChange={(_event, value) => onSeek(value as number)}
        size="small"
        step={0.0001}
        value={playedPercent}
      />
    </Box>
  );
};

export default VideoPlayer;
