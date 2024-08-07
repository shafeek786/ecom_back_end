import { diskStorage } from 'multer';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Ensure this path is correct and writable
    filename: (req, file, cb) => {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 5e9);
      cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
    },
  }),
};
