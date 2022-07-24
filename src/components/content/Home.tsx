import { Box, CircularProgress, MenuItem, Paper, Select, Typography } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect } from "react";
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

const Home = () => {
  const hash = useLocation().hash.substring(1);
  const collectionPreviews: {
    [key: string]: v1.CollectionPreview[];
  } = useAppSelector((state) => state.content.collections);
  const collection: v1.Collection | undefined | null = useAppSelector((state) => state.content.collection);
  const seasonId: string = useAppSelector((state) => state.content.season);
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
        console.log(`collection default ${collection.name}`);
        dispatch(setCurrentSeason(seasons[0]?.id));
      }
    }
  }, [collection]);

  return collection ? (
    <Paper sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
        {collection &&
          !!seasonId &&
          collection.seasons.find((season) => season.id === seasonId) &&
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
    </Paper>
  ) : (
    <Collections />
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
