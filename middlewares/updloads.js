import multer from 'multer'

const storage = multer.memoryStorage()

export const updload = multer({
    storage,
    limits: 2 * 1024 *1024
})