import axios from 'axios';

export const imageForUrl = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post('http://localhost:3000/images/upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error.response?.data || error.message);
        throw error;
    }
};
