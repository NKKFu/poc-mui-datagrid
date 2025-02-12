import {
    gridFilteredTopLevelRowCountSelector,
    GridFooterContainer,
    GridFooterContainerProps,
    GridRowCount,
    GridSelectedRowCount,
    gridTopLevelRowCountSelector,
    selectedGridRowsCountSelector,
    useGridApiContext,
    useGridRootProps,
    useGridSelector
} from "@mui/x-data-grid-premium"
import React from "react";


export const CustomFooter: React.FC<GridFooterContainerProps & React.PropsWithChildren> = (props) => {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const totalTopLevelRowCount = useGridSelector(apiRef, gridTopLevelRowCountSelector);
    const selectedRowCount = useGridSelector(apiRef, selectedGridRowsCountSelector);
    const visibleTopLevelRowCount = useGridSelector(apiRef, gridFilteredTopLevelRowCountSelector);

    const selectedRowCountElement =
        !rootProps.hideFooterSelectedRowCount && selectedRowCount > 0 ? (
            <GridSelectedRowCount selectedRowCount={selectedRowCount} />
        ) : (
            <div />
        );

    const rowCountElement =
        !rootProps.hideFooterRowCount && !rootProps.pagination ? (
            <GridRowCount rowCount={totalTopLevelRowCount} visibleRowCount={visibleTopLevelRowCount} />
        ) : null;

    const paginationElement = rootProps.pagination &&
        !rootProps.hideFooterPagination &&
        rootProps.slots.pagination && (
            <rootProps.slots.pagination {...rootProps.slotProps?.pagination} />
        );

    return (
        <GridFooterContainer {...props}>
            {selectedRowCountElement}
            <div style={{ display: 'flex', flexDirection: 'row' }} >
                {rowCountElement}
                {paginationElement}
                <div style={{ alignContent: 'center', marginRight: 8 }}>
                    {props.children}
                </div>
            </div>
        </GridFooterContainer>
    );
};