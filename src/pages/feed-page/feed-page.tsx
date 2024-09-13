import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { toggleLike, addComment, fetchPosts } from '../../features/postSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import { Card, CommentInput, FeedContainer } from './feed-page.style';
import CircularProgress from '@mui/material/CircularProgress';
import CreatePostPage from '../create-post-page';

const FeedPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { posts, status, error } = useSelector((state: RootState) => state.posts);
    const user = useSelector((state: RootState) => state.auth.user);
    const [commentVisible, setCommentVisible] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <CircularProgress />;
    }

    if (status === 'failed') {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    const handleLike = (postId: number) => {
        if (user && user.id) {
            dispatch(toggleLike({ postId, userId: user.id }));
        }
    };

    const handleComment = (postId: number, comment: string) => {
        if (comment.trim()) {
            dispatch(addComment({ postId, comment: comment.trim() }));
        }
    };

    const toggleCommentSection = (postId: number) => {
        setCommentVisible((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    const renderMedia = (media: { type?: string; url?: string }[]) => {
        return media.map((mediaItem, idx) => {
            if (mediaItem && mediaItem.type && mediaItem.url) {
                if (mediaItem.type.startsWith('image/')) {
                    return <img key={idx} src={mediaItem.url} alt="Post media" style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }} />;
                } else if (mediaItem.type.startsWith('video/')) {
                    return (
                        <video key={idx} controls style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px' }}>
                            <source src={mediaItem.url} type={mediaItem.type} />
                            Your browser does not support the video tag.
                        </video>
                    );
                } else if (mediaItem.type.startsWith('audio/')) {
                    return (
                        <audio key={idx} controls style={{ width: '100%', marginTop: '10px' }}>
                            <source src={mediaItem.url} type={mediaItem.type} />
                            Your browser does not support the audio element.
                        </audio>
                    );
                }
            }
            return null;
        });
    };

    return (
        <FeedContainer>
            <CreatePostPage />
            {posts.map((post) => (
                <Card key={post.id} variant="outlined">
                    <Typography variant="body1">{post.content}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {post.author}
                    </Typography>

                    {post.media && renderMedia(post.media)}

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <IconButton onClick={() => handleLike(post.id)}>
                            {post.likedBy && user && post.likedBy.includes(String(user.id)) ? (
                                <ThumbUpAltIcon color="primary" />
                            ) : (
                                <ThumbUpOffAltIcon />
                            )}
                        </IconButton>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {post.likes}
                        </Typography>

                        <IconButton onClick={() => toggleCommentSection(post.id)} sx={{ ml: 2 }}>
                            <CommentIcon />
                        </IconButton>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {post.comments.length}
                        </Typography>
                    </Box>

                    {commentVisible[post.id] && (
                        <Box sx={{ mt: 2 }}>
                            <CommentInput
                                placeholder="Add a comment..."
                                fullWidth
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const input = e.target as HTMLInputElement;
                                        handleComment(post.id, input.value);
                                        input.value = '';
                                    }
                                }}
                            />
                            <Box component="ul" sx={{ listStyleType: 'none', padding: 0 }}>
                                {post.comments.map((comment, idx) => (
                                    <Box component="li" key={idx} sx={{ padding: '8px 0' }}>
                                        <Typography variant="body2">{comment}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Card>
            ))}
        </FeedContainer>
    );
};

export default FeedPage;
