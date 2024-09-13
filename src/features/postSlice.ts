import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
    id: number;
    content: string;
    author: string;
    likes: number;
    likedBy: string[];
    comments: string[];
    media: { type: string; url: string }[];
}

interface PostState {
    posts: Post[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const apiFetchPosts = async (): Promise<Post[]> => {
    return new Promise((resolve) =>
        setTimeout(() => resolve(JSON.parse(localStorage.getItem('posts') || '[]')), 500)
    );
};

const apiCreatePost = async (post: Post): Promise<Post> => {
    return new Promise((resolve) =>
        setTimeout(() => {
            const currentPosts = JSON.parse(localStorage.getItem('posts') || '[]');
            currentPosts.push(post);
            localStorage.setItem('posts', JSON.stringify(currentPosts));
            resolve(post);
        }, 500)
    );
};

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const posts = await apiFetchPosts();
    return posts;
});

export const createNewPost = createAsyncThunk(
    'posts/createNewPost',
    async ({ content, author, media }: { content: string; author: string; media: { type: string; url: string }[]; }) => {
        const newPost: Post = {
            id: Date.now(),
            content,
            author,
            likes: 0,
            likedBy: [],
            comments: [],
            media,
        };
        return await apiCreatePost(newPost);
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleLike(state, action: PayloadAction<{ postId: number; userId: number }>) {
            const { postId, userId } = action.payload;
            const post = state.posts.find((p) => p.id === postId);
            if (post) {
                const hasLiked = post.likedBy.includes(String(userId));
                if (hasLiked) {
                    post.likes -= 1;
                    post.likedBy = post.likedBy.filter((id) => id !== String(userId));
                } else {
                    post.likes += 1;
                    post.likedBy.push(String(userId));
                }
                localStorage.setItem('posts', JSON.stringify(state.posts));
            }
        },
        addComment(state, action: PayloadAction<{ postId: number; comment: string }>) {
            const post = state.posts.find((p) => p.id === action.payload.postId);
            if (post) {
                post.comments.push(action.payload.comment);
                localStorage.setItem('posts', JSON.stringify(state.posts));
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to load posts';
            })
            .addCase(createNewPost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewPost.fulfilled, (state, action: PayloadAction<Post>) => {
                state.status = 'succeeded';
                state.posts.push(action.payload);
                localStorage.setItem('posts', JSON.stringify(state.posts));
            })
            .addCase(createNewPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create post';
            });
    },
});

export const { toggleLike, addComment } = postSlice.actions;
export const postReducer = postSlice.reducer;
