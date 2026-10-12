const jwt = require('jsonwebtoken'); const multer = require('multer'); const path = require('path');
const { validationResult } = require('express-validator');

exports.auth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try { req.user = jwt.verify(token, process.env.JWT_SECRET); next(); }
  catch { res.status(401).json({ message: 'Sesi habis, silakan login lagi' }); }
};
exports.onlyUstadz = (req, res, next) =>
  req.user.role === 'USTADZ' ? next() : res.status(403).json({ message: 'Hanya ustadz yang boleh' });

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ message: errors.array()[0].msg, errors: errors.array() });
  next();
};

const ALLOWED = ['.png', '.jpg', '.jpeg', '.pdf', '.zip', '.txt', '.js'];
exports.upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/[^\w.-]/g, '_')),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    ALLOWED.includes(path.extname(file.originalname).toLowerCase()) ? cb(null, true) : cb(new Error('Tipe file tidak didukung')),
});
