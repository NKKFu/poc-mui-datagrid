import { Button } from "@mui/material"
import { UseQueryResult } from "@tanstack/react-query";
import React, { } from "react";

export type RefetchButtonProps = {
    query: UseQueryResult;
}

export const RefetchButton: React.FC<RefetchButtonProps> = ({
    query,
}) => {
    return <>
        <Button
            variant="outlined"
            color="primary"
            onClick={() => query.refetch()}
            disabled={query.isFetching}
            loading={query.isFetching}
        >
            Refetch
            {/* <Zoom in={query.isFetching}>
                <p>Refetching</p>
            </Zoom>
            <Zoom in={!query.isFetching} style={{ transitionDelay: query.isFetching ? '500ms' : '0ms' }}>
                <p>Refetch</p>
            </Zoom> */}
        </Button>
    </>
}
