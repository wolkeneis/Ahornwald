import { MenuItem, Paper, Select, Typography } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchSeason } from "../../logic/api";
import { setCurrentCollection, setCurrentSeason, setSeason } from "../../redux/contentSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Home from "./Home";

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

const Collection = () => {
  const hash = useLocation().hash.substring(1);
  const collections: {
    [key: string]: v1.Collection[];
  } = useAppSelector((state) => state.content.collections);
  const collection: v1.Collection = useAppSelector((state) => state.content.collection);
  const seasons: { [key: string]: v1.Season } = useAppSelector((state) => state.content.seasons);
  const season: string = useAppSelector((state) => state.content.season);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hash) {
      const collection = Object.keys(collections)
        .map((userId) => collections[userId])
        .find((collectionList) => collectionList.find((collection) => collection.id === hash))
        ?.find((collection) => collection.id === hash);

      if (collection) {
        dispatch(setCurrentCollection(collection));
      }
    }
  }, [hash, collections]);

  useEffect(() => {
    if (collection) {
      Promise.all(
        collection.seasons.map(async (seasonId) => await fetchSeason({ id: seasonId }).catch(() => null))
      ).then((unfilteredSeasons) => {
        if (unfilteredSeasons) {
          const seasons = unfilteredSeasons.filter((season) => !!season);
          if (seasons.length > 0) {
            seasons.sort(sorter);
            dispatch(setCurrentSeason(seasons[0]?.id));
            seasons.forEach((season) => dispatch(setSeason(season)));
          }
        }
      });
    }
  }, [collection]);

  useEffect(() => {
    const currentSeason = seasons[season];
    if (currentSeason) {
      console.log(currentSeason);
    }
  }, [season]);

  return collection ? (
    <Paper sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
      <Typography variant="h5">{collection.name}</Typography>
      {!!season && (
        <Select onChange={(event) => dispatch(setSeason(event.target.value))} value={season}>
          {collection.seasons
            .map((seasonId) => seasons[seasonId])
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
  ) : (
    <Home />
  );
};

export default Collection;
