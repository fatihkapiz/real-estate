import { useState } from 'react';
import axios from 'axios';

function AddRealEstate() {
    const [title, setTitle] = useState('');
    const [images, setImages] = useState([]);
    
    const handleImageChange = (e) => {
        const selectedImages = Array.from(e.target.files);
        setImages(selectedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        try {
            const response = await axios.post('/api/realEstate', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Real Estate created with ID:', response.data);
        } catch (error) {
            console.error('Error creating Real Estate:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            <button type="submit">Create Real Estate</button>
        </form>
    );
}

export default AddRealEstate;