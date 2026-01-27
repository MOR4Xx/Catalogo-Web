import { cloudinary } from "@/lib/cloudinary";

export default class ImageService {
    async upload(file) {
        return new Promise(async (resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "products" },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            ).end(Buffer.from(await file.arrayBuffer()));
        });
    }
}
