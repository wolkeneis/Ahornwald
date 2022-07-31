import LanguageIcon from "@mui/icons-material/Language";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlayDisabledIcon from "@mui/icons-material/PlayDisabled";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography
} from "@mui/material";
import { v1 } from "moos-api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCollection } from "../../logic/api";
import { setCurrentCollection, setCurrentSeason } from "../../redux/contentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LoginRequired from "../LoginRequired";

const sorter = (firstSeason: v1.Season | null, secondSeason: v1.Season | null) => {
  const a = (firstSeason?.index ?? 0) - 1;
  const b = (secondSeason?.index ?? 0) - 1;
  if (a < 0 && b < 0) {
    return b - a;
  } else if (a < 0) {
    return 1;
  } else if (b < 0) {
    return -1;
  } else {
    return a - b;
  }
};

const seasonNameOf = (index: number) => {
  if (index === 0) {
    return "Specials";
  } else if (index > 0) {
    return `Season ${index}`;
  } else {
    return null;
  }
};
const languageNameOf = (language: v1.Language) => {
  switch (language) {
    case "de_DE":
      return "German";
    case "en_EN":
      return "English";
    case "ja_JP":
      return "Japanese";
    case "zh_CN":
      return "Chinese";
  }
};

const Home = () => {
  const hash = useLocation().hash.substring(1);
  const collectionPreviews: {
    [key: string]: v1.CollectionPreview[];
  } = useAppSelector((state) => state.content.collections);
  const collection: v1.Collection | undefined | null = useAppSelector((state) => state.content.collection);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hash && (!collection || collection.id !== hash)) {
      dispatch(setCurrentCollection(null));
      fetchCollection({ id: hash })
        .then((fetchedCollection) => {
          if (!fetchedCollection) {
            return dispatch(setCurrentCollection(undefined));
          }
          if (fetchedCollection.id !== collection?.id) {
            dispatch(setCurrentCollection(fetchedCollection));
          }
        })
        .catch(() => dispatch(setCurrentCollection(undefined)));
    } else if (!hash) {
      dispatch(setCurrentCollection(undefined));
      dispatch(setCurrentSeason(undefined));
    }
  }, [hash, collectionPreviews]);

  useEffect(() => {
    if (collection) {
      const seasons = collection.seasons.filter((season) => !!season);
      if (seasons.length > 0) {
        seasons.sort(sorter);
        dispatch(setCurrentSeason(seasons[0]?.id));
      }
    }
  }, [collection]);

  return collection ? (
    <Collection collection={collection} />
  ) : (
    <>
      {collection === null ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress />{" "}
        </Box>
      ) : (
        <Collections />
      )}
    </>
  );
};

const Collection = ({ collection }: { collection: v1.Collection }) => {
  const seasonId: string = useAppSelector((state) => state.content.season);
  const preferredLanguage: v1.Language | null = useAppSelector((state) => state.content.preferredLanguage);
  const [season, setSeason] = useState<v1.Season | undefined>();
  const drawerOpen: boolean = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth: number = useAppSelector((state) => state.interface.drawerWidth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (seasonId) {
      setSeason(collection?.seasons.find((season) => season.id === seasonId));
    }
  }, [collection, seasonId]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "stretch" }}>
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2
        }}
      >
        <Typography variant="h5">{collection.name}</Typography>
        {!!season &&
          !!collection.seasons
            .map((season) => ({ name: seasonNameOf(season?.index ?? -1), ...season }))
            .filter((season) => !!season.name).length && (
            <Select onChange={(event) => dispatch(setCurrentSeason(event.target.value))} value={seasonId}>
              {[...collection.seasons]
                .sort(sorter)
                .map((season) => ({ name: seasonNameOf(season?.index ?? -1), ...season }))
                .filter((season) => !!season.name)
                .map((season) => (
                  <MenuItem key={season.id} value={season.id}>
                    {season.name}
                  </MenuItem>
                ))}
            </Select>
          )}
      </Paper>
      {!!season && (
        <Paper sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box>
            <List component="div">
              {season.episodes.map((episode) => (
                <ListItem
                  component="div"
                  disabled={!episode.sources.length}
                  key={episode.id}
                  sx={{ minWidth: "20vw", gap: 1 }}
                >
                  <ListItemIcon>
                    <Button>{episode.sources.length ? <PlayArrowIcon /> : <PlayDisabledIcon />}</Button>
                  </ListItemIcon>
                  <ListItemText
                    primary={season.index > 0 ? `${episode.index}. Episode` : episode.name}
                    primaryTypographyProps={{
                      sx: {
                        maxWidth: `calc(80% ${drawerOpen ? drawerWidth : 0}px`,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }
                    }}
                    secondary={season.index > 0 ? episode.name : undefined}
                    secondaryTypographyProps={{
                      sx: {
                        maxWidth: `calc(80% ${drawerOpen ? drawerWidth : 0}px`,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                      }
                    }}
                    title={episode.name}
                  />
                  <Tooltip title={<LanguageTooltip episode={episode} />}>
                    <ListItemIcon>
                      <LanguageIcon sx={{ cursor: "pointer" }} />
                    </ListItemIcon>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

const LanguageTooltip = ({ episode }: { episode: v1.Episode }) => {
  return (
    <>
      {episode.sources.map((source) => (
        <Typography key={`${source.language}:${source.subtitles}`} variant="body2">
          {source.subtitles
            ? `${languageNameOf(source.language)}, [${languageNameOf(source.subtitles)}]`
            : `${languageNameOf(source.language)}`}
        </Typography>
      ))}
    </>
  );
};

const Collections = () => {
  const profile: v1.UserProfile = useAppSelector((state) => state.session.profile);
  const collections: {
    [key: string]: v1.CollectionPreview[];
  } = useAppSelector((state) => state.content.collections);
  const mobile = useAppSelector((state) => state.interface.mobile);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : 4
      }}
    >
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile !== null ? (
            <Box
              sx={{
                display: "flex",
                flexFlow: "wrap",
                justifyContent: "space-around",
                margin: "auto",
                paddingX: "5%"
              }}
            >
              {Object.keys(collections).map((friendId: string) => {
                const collectionList = collections[friendId];
                return collectionList.map((collection) => (
                  <CollectionPreview collection={collection} key={collection.id} />
                ));
              })}
            </Box>
          ) : (
            <LoginRequired />
          )}
        </>
      )}
    </Box>
  );
};

const CollectionPreview = ({ collection }: { collection: v1.CollectionPreview }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={4}
      onClick={() => navigate(`/#${collection.id}`)}
      sx={{
        userSelect: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        padding: 3,
        gap: 3,
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "80vw",
        transform: "scale(0.98)",
        margin: 4,
        "&:hover": {
          transform: "scale(1)"
        }
      }}
    >
      <Box
        alt="Thumbnail"
        component="img"
        draggable={false}
        src={collection.thumbnail}
        sx={{ userSelect: "none", width: "calc(25vw - 2rem)", minWidth: "120px", maxWidth: "200px" }}
      />
      <Typography
        sx={{
          width: "calc(25vw - 2rem)",
          minWidth: "120px",
          maxWidth: "200px",
          textTransform: "uppercase"
        }}
        variant="body1"
      >
        {collection.name}
      </Typography>
    </Paper>
  );
};

export default Home;
