import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, List, ListItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Upload = ({
  maxSize = 5 * 1024 * 1024 , // 5MB
  accept = {
    'application/pdf': [],
    'image/*': [],
  },
  multiple = false,
  onFilesChange,
}) => {
  const [files, setFiles] = useState([]);
console.log(files,'filesfilesfiles');

const onDrop = useCallback((acceptedFiles, fileRejections) => {
     console.log(fileRejections,'aaaa')
  if (fileRejections.length > 0) {
    console.log(fileRejections); // debug

    alert('Some files were rejected due to size/type');
    return;
  }

  const updatedFiles = [...files, ...acceptedFiles];
  setFiles(updatedFiles);

  if (onFilesChange) {
    onFilesChange(updatedFiles);
  }
}, [files, onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept,
    multiple,
  });

  const handleRemove = (index) => {
    const  updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange && onFilesChange(updated);
  };

  return (
    <Box>
      {/* Drop Area */}
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed #aaa',
          borderRadius: 2,
          p: 1,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#f5f5f5' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1">
          {isDragActive
            ? 'Drop files here...'
            : 'Drag & drop files here, or click to select'}
        </Typography>
        <Typography variant="caption">
          Max size: {maxSize / ( 1024 * 1024)} MB
        </Typography>
      </Box>

      <List>
        {files.map((file, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton onClick={() => handleRemove(index)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Typography variant="body2">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Upload;