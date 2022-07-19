import { Paper } from "@mui/material";
import { v1 } from "moos-api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Collection = () => {
  const hash = useLocation().hash.substring(1);
  const [collection, setCollection] = useState<v1.Collection | null>(null);

  useEffect(() => {
    if (hash) {
    }
  }, [hash]);

  return <Paper sx={{ display: "flex", flexDirection: "column", padding: 2 }}></Paper>;
};

export default Collection;
