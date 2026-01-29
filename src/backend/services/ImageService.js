import { cloudinary } from "@/lib/cloudinary";

export default class ImageService {
    async upload(file) {
        return new Promise(async (resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'products' },
                (error, result) => {
                    if (error) return reject(error);

                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            ).end(Buffer.from(await file.arrayBuffer()));
        });
    }

    async delete(publicId) {
        if (!publicId) return;
        await cloudinary.uploader.destroy(publicId);
    }
}
