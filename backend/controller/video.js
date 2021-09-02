import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../model/user.js';
import VideoModel from '../model/video.js';
import cloudinary from 'cloudinary';
import path from 'path';
import util from 'util';
const __dirname = path.resolve();
import { exec } from 'child_process';
const execs = util.promisify(exec);
import constant from '../constant/index.js';


cloudinary.config({
    cloud_name: constant.cloudName,
    api_key: constant.apiCloudinaryKey,
    api_secret: constant.apiCloudinarySecretKey
});
const getVideoInfoToSaveDB = async (videoInfo) => {
    let obj = {
        fileName: videoInfo.original_filename,
        fileUrl: videoInfo.url,
        assetId: videoInfo.asset_id,
        publicId: videoInfo.public_id,
        versionId: videoInfo.version_id,
        version: videoInfo.version,
        signature: videoInfo.signature,
        format: videoInfo.format,
        resourceType: videoInfo.resource_type,
        bytes: videoInfo.bytes,
    };
    return obj;
}
// Upload video functionality
export const uploadVideo = async (req, res) => {
    try {
        const file = req.files.file;
        const clientVideoPath = `${__dirname}/temp/${file.name}`
        file.mv(clientVideoPath, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
        });

        let filePath = clientVideoPath
        if (file.mimetype !== 'video/mp4') {
            filePath = `${clientVideoPath}_${Date.now()}.mp4`
            await execs(`ffmpeg -i ${__dirname}/temp/${file.name} ${filePath}`)
        }

        try {
            let videoInfo = await cloudinary.v2.uploader.upload(filePath, { resource_type: "video" });
            let obj = await getVideoInfoToSaveDB(videoInfo)
            obj.userId = req.userId;
            let data = await VideoModel.create(obj);
            return res.status(201).json({ successMsg: 'Video successfully uploaded!', data });

        } catch (error) {
            console.log('error: ', error)
            return res.status(500).send(error);

        }

    } catch (error) {
        console.log('error ', error)
        return res.status(500).send(error);
    }
}

export const getVideos = async (req, res) => {
    try {
        let data = await VideoModel.find({})
        return res.status(200).json({ successMsg: 'Video successfully fetched!', data });

    } catch (error) {
        console.log('error ', error)
        return res.status(500).send(error);
    }
}
export default { uploadVideo }