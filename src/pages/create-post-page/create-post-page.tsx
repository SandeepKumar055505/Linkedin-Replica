import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../features/postSlice';
import { RootState, AppDispatch } from '../../store/store';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import { Card, CreatePostContainer, FileDropArea } from './create-post-page.style';
import DOMPurify from 'dompurify';
import CircularProgress from '@mui/material/CircularProgress';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CreatePostPage: React.FC = () => {
    const [content, setContent] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.auth.user);
    const [isDragging, setIsDragging] = useState(false);

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedVideoTypes = ['video/mp4', 'video/webm'];
    const allowedAudioTypes = ['audio/mp3', 'audio/wav'];

    const sanitizeInput = (input: string) => DOMPurify.sanitize(input);

    const validateContent = (input: string) => {
        if (input.length === 0 && files.length === 0) {
            setError('Post content or media is required.');
            return false;
        } else if (input.length > 500) {
            setError('Post content cannot exceed 500 characters.');
            return false;
        }
        return true;
    };

    const validateFile = (file: File) => {
        if (!allowedImageTypes.includes(file.type) && !allowedVideoTypes.includes(file.type) && !allowedAudioTypes.includes(file.type)) {
            setError(`Unsupported file type: ${file.type}. Please upload an image, video, or audio file.`);
            return false;
        }
        if (file.size > 100 * 1024 * 1024) {
            setError(`File size for ${file.name} cannot exceed 10MB.`);
            return false;
        }
        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        processFiles(selectedFiles);
    };

    const processFiles = (selectedFiles: File[]) => {
        const validFiles: File[] = [];
        const previewUrls: string[] = [];

        selectedFiles.forEach((file) => {
            if (validateFile(file)) {
                validFiles.push(file);
                previewUrls.push(URL.createObjectURL(file));
            }
        });

        setFiles([...files, ...validFiles]);
        setPreviews([...previews, ...previewUrls]);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const handlePost = async () => {
        setSuccess(false);
        setError('');
        setLoading(true);

        const sanitizedContent = sanitizeInput(content);

        const mediaData = files.map((file) => ({
            type: file.type,
            url: URL.createObjectURL(file),
        }));

        if (validateContent(sanitizedContent) && user) {
            try {
                const postData = { content: sanitizedContent, author: user.name, media: mediaData };
                await dispatch(createNewPost(postData)).unwrap();
                setSuccess(true);
                setContent('');
                setFiles([]);
                setPreviews([]);
            } catch (err) {
                setError('An error occurred while creating the post. Please try again.');
            }
        }
        setLoading(false);
    };

    const removeFile = (index: number) => {
        const updatedFiles = [...files];
        const updatedPreviews = [...previews];
        updatedFiles.splice(index, 1);
        updatedPreviews.splice(index, 1);
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
    };

    return (
        <CreatePostContainer>
            <Card variant="outlined">
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >
                    Create Post
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">Post created successfully!</Alert>}
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handlePost();
                    }}
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <FormControl>
                        <FormLabel htmlFor="content">What's on your mind?</FormLabel>
                        <TextField
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 500,
                                'aria-label': 'Post Content',
                            }}
                            error={!!error}
                            helperText={error || ''}
                        />
                    </FormControl>

                    <FileDropArea
                        isDragging={isDragging}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <UploadFileIcon sx={{ fontSize: 40, color: isDragging ? 'primary.main' : 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: isDragging ? 'primary.main' : 'text.secondary' }}>
                            {isDragging ? 'Drop your files here' : 'Drag & drop your files here or click to browse'}
                        </Typography>
                        <input
                            type="file"
                            accept="image/*,video/*,audio/*"
                            id="media"
                            multiple
                            onChange={handleFileChange}
                            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, cursor: 'pointer' }}
                        />
                    </FileDropArea>

                    {previews.length > 0 && (
                        <Box>
                            {previews.map((previewUrl, index) => (
                                <Box key={index} sx={{ position: 'relative', marginBottom: 2 }}>
                                    {allowedImageTypes.includes(files[index]?.type || '') && (
                                        <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                                    )}
                                    {allowedVideoTypes.includes(files[index]?.type || '') && (
                                        <video controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
                                            <source src={previewUrl} type={files[index]?.type} />
                                        </video>
                                    )}
                                    {allowedAudioTypes.includes(files[index]?.type || '') && (
                                        <audio controls>
                                            <source src={previewUrl} type={files[index]?.type} />
                                        </audio>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        onClick={() => removeFile(index)}
                                        sx={{ position: 'absolute', top: 5, right: 5 }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={loading || (!content && files.length === 0)}
                        startIcon={loading && <CircularProgress size={20} />}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                </Box>
            </Card>
        </CreatePostContainer>
    );
};

export default CreatePostPage;
