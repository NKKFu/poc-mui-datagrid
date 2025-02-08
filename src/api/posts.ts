import { Post } from "../models/post";
import { apiConnection } from "../configs/axios.config";

export const posts = {
    get: () => apiConnection.get<Post[]>('/posts'),
}
