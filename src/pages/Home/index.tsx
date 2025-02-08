import {
	DataGridPremium,
	GridColDef,
	GridRowId,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	useGridApiRef
} from "@mui/x-data-grid-premium"
import { useListPosts } from "../../hooks/queries/useListPosts";
import { Post } from "../../models/post";
import { Container, Footer } from "./styles";
import { Button } from "@mui/material";
import { useContext } from "react";
import { RowsSelectedContext } from "../../contexts/rowsSelectedContext";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../configs/query.config";
import { renderInputfield } from "../../components/InputfieldRender";

export const Home = () => {
	const {
		queryKey: postsQueryKey,
		query: postsQuery
	} = useListPosts();
	const navigate = useNavigate();
	const apiRef = useGridApiRef();

	const { postIdsSelected, setPostIdsSelected } = useContext(RowsSelectedContext);

	function handleUpdateRow(rows: React.SetStateAction<Post[]>) {
		queryClient.setQueryData(postsQueryKey, rows as Post[]);
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
					<Button
						variant="text"
						color="primary"
						onClick={() => postsQuery.refetch()}
					>
						Refetch
					</Button>
					<GridToolbarDensitySelector />
				</GridToolbarContainer>
			}}
			checkboxSelection
			columns={columns}
			rows={postsQuery.data || []}
			loading={postsQuery.isFetching}
			apiRef={apiRef}
			onRowSelectionModelChange={newSelection => setPostIdsSelected(newSelection as GridRowId[])}
			rowSelectionModel={postIdsSelected}
			disableRowSelectionOnClick
		/>

		<Footer>
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
		</Footer>
	</Container>
}
