import { useQuery } from "@tanstack/react-query";
import { posts } from "../../api/posts";

export const useListPosts = () => {
    const queryKey = ["posts"];
    const query = useQuery({
        queryKey,
        queryFn: async () => {
            return (await posts.get()).data;
        },
        // Do not set initialData, otherwise it will never be called on the first attempt
        initialData: undefined,
    });

    return {
        query,
        queryKey,
    };
}
