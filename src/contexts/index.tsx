import React, { PropsWithChildren, useState } from "react";
import { RowsSelectedContext } from "./rowsSelectedContext";
import { GridRowId } from "@mui/x-data-grid-premium";

export const Contexts: React.FC<PropsWithChildren> = ({ children }) => {
    const [postIdsSelected, setPostIdsSelected] = useState<GridRowId[]>([]);

    return <RowsSelectedContext.Provider value={{ postIdsSelected, setPostIdsSelected }}>
        {children}
    </RowsSelectedContext.Provider>;
}
