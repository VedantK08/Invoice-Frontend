import axios from "axios";

export const uploadInvoieThumbnail = async (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);
    formData.append('upload_preset', 'invoices-thumbnail');
    formData.append('cloud_name','dqbic163p');

    const response = await axios.post(`https://api.cloudinary.com/v1_1/dqbic163p/image/upload`,formData);

    return response.data.secure_url;
}