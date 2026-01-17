
import cloudinary from '../utils/cloudinary.js'
import User from '../models/user.js';
export const fileUploads = (req , res , next) => {
    if(!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const stream = cloudinary.uploader.upload_stream({
        folder: 'personal-track-fanance',
        resource_type: 'auto',
       
    },
   async (err , result) => {
        if(err){
            next(err)
        }
        await User.findByIdAndUpdate( req.user._id , { profile: result.secure_url})
        res.status(201).json({
            success: true,
            fileUrl: result.secure_url
        })
    }

)
 stream.end(req.file.buffer)
}