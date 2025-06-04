const multer = require('multer');
const path = require('path');

// Pasta onde as imagens serão salvas
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const nomeArquivo = `${Date.now()}${ext}`;
    cb(null, nomeArquivo);
  },
});

const fileFilter = (req, file, cb) => {
  // aceita só imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Somente arquivos de imagem são permitidos'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
