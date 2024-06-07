import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'daxqzxfut', 
    api_key: '397172913513468', 
    api_secret: '9lonw2Z2tBQBGoiFRPmoLjVKzDE' 
  });


export const cloudUpload = async (req) => {
    // create brand logo
    const data = await cloudinary.uploader.upload(req.file.path);
    return data;
}

export const cloudUploads = async (path) => {
    // create brand logo
    const data = await cloudinary.uploader.upload(path);
    return data.secure_url;
}

export const cloudDelete = async (publicId) => {
    // delete brand logo
    await cloudinary.uploader.destroy(publicId);
}