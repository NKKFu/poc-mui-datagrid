import {
    DataGridPremium,
    GridColDef,
    GridRowId,
    GridToolbarContainer,
    useGridApiRef
} from "@mui/x-data-grid-premium"
import { useListPosts } from "../../hooks/queries/useListPosts";
import { Post } from "../../models/post";
import { Container } from "./styles";
import { Button } from "@mui/material";
import React, { useContext } from "react";
import { RowsSelectedContext } from "../../contexts/rowsSelectedContext";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../configs/query.config";
import { renderInputfield } from "../../components/InputfieldRender";
import { RefetchButton } from "../../components/RefetchButtonRender";
import { CustomFooter } from "../../components/CustomFooter";


export const Home = () => {
    const {
        queryKey: listPostsQueryKey,
        query: listPostsQuery,
    } = useListPosts();

    const navigate = useNavigate();
    const apiRef = useGridApiRef();

    const { postIdsSelected, setPostIdsSelected } = useContext(RowsSelectedContext);

    function handleUpdateRow(rows: React.SetStateAction<Post[]>) {
        queryClient.setQueryData(listPostsQueryKey, rows as Post[]);
    }

    const columns = [
        {
            field: 'userId',
            type: 'number',
        },
        {
            field: 'id',
            type: 'number',
        },
        {
            field: 'title',
            type: 'string',
        },
        {
            field: 'body',
            type: 'string',
            flex: 1,
            renderCell: renderInputfield(handleUpdateRow),
        },
    ] as GridColDef<Post>[];

    return <Container>
        <DataGridPremium
            slots={{
                toolbar: () => <GridToolbarContainer>
                    <RefetchButton query={listPostsQuery} />
                </GridToolbarContainer>,
                footer: (props) => <CustomFooter {...props}>
                    <Button
                        variant="contained"
                        color="success"
                        disabled={postIdsSelected.length <= 0}
                        onClick={() => {
                            navigate('/delete-posts');
                        }}
                    >
                        Next
                    </Button>
                </CustomFooter>,
            }}
            checkboxSelection
            columns={columns}
            rows={listPostsQuery.data || []}
            loading={listPostsQuery.isFetching}
            apiRef={apiRef}
            onRowSelectionModelChange={newSelection => setPostIdsSelected(newSelection as GridRowId[])}
            rowSelectionModel={postIdsSelected}
            disableRowSelectionOnClick
            density="compact"
        />
    </Container>
}
