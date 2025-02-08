import { createContext } from "react";
import { GridRowId } from "@mui/x-data-grid-premium";

export const RowsSelectedContext = createContext<{
    postIdsSelected: GridRowId[];
    setPostIdsSelected: React.Dispatch<React.SetStateAction<GridRowId[]>>;
}>({
    postIdsSelected: [],
    setPostIdsSelected: () => { },
});
