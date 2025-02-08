import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid-premium"
import { Post } from "../models/post"
import { useEffect, useState } from "react"
import { TextField } from "@mui/material"


export const renderInputfield = (updateValue: React.Dispatch<React.SetStateAction<Post[]>>) => ({
    row,
    value,
}: GridRenderCellParams<Post, any, any, GridTreeNodeWithRender>): React.ReactNode => {
    const [cellValue, setCellValue] = useState(value);

    useEffect(() => {
        const debounceTiming = 100;
        const delayDebounceFn = setTimeout(() => {
            updateValue((prev) => {
                return prev.map((r) => {
                    if (r.id === row.id) {
                        return { ...r, body: cellValue };
                    }
                    return r;
                });
            });
        }, debounceTiming);
        return () => clearTimeout(delayDebounceFn)
    }, [cellValue]);

    return <TextField
        value={cellValue}
        onChange={(e) => {
            setCellValue(e.target.value);
        }}
        fullWidth
        size="small"
    />
}
