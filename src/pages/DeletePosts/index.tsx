import {
	DataGridPremium,
	GridColDef,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	useGridApiRef
} from "@mui/x-data-grid-premium"
import { Post } from "../../models/post";
import { Button } from "@mui/material";
import { useContext, useEffect } from "react";
import { RowsSelectedContext } from "../../contexts/rowsSelectedContext";
import { useNavigate } from "react-router-dom";
import { Container, Footer } from "./styles";
import { renderInputfield } from "../../components/InputfieldRender";
import { queryClient } from "../../configs/query.config";
import { useListPosts } from "../../hooks/queries/useListPosts";

export const DeletePosts: React.FC = () => {
	const {
		query: postsQuery,
		queryKey: postsQueryKey,
	} = useListPosts();
	const { postIdsSelected } = useContext(RowsSelectedContext);
	const navigate = useNavigate();
	const apiRef = useGridApiRef();

	const rowsFiltered = postsQuery.data?.filter((post) => postIdsSelected.includes(post.id)) || [];

	function handleUpdateRow(rows: React.SetStateAction<Post[]>) {
		queryClient.setQueryData(postsQueryKey, rows as Post[]);
	}

	useEffect(() => {
		if (postIdsSelected.length === 0) {
			navigate('/');
		}
	}, [postIdsSelected, navigate]);

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
			renderCell: renderInputfield(handleUpdateRow),
			flex: 1,
		},
	] as GridColDef<Post>[];

	return <Container>
		<DataGridPremium
			slots={{
				toolbar: () => <GridToolbarContainer>
					<GridToolbarDensitySelector />
				</GridToolbarContainer>
			}}
			columns={columns}
			rows={rowsFiltered}
			apiRef={apiRef}
			disableRowSelectionOnClick
		/>

		<Footer>
			<Button
				variant="contained"
				onClick={() => {
					navigate('/');
				}}
			>
				Go back
			</Button>
		</Footer>
	</Container>
}
