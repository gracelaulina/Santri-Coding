const router = require('express').Router(); const bcrypt = require('bcryptjs'); const jwt = require('jsonwebtoken');
const { body } = require('express-validator'); const db = require('../db');
const { validate, auth, upload } = require('../middleware');

const sign = (u) => jwt.sign({ id: u.id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
const safe = ({ password, ...u }) => u;

router.post('/register',
  body('name').trim().isLength({ min: 3 }).withMessage('Nama minimal 3 huruf'),
  body('email').isEmail().withMessage('Email tidak valid').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'), validate,
  async (req, res) => {
    const { name, email, password } = req.body;
    if (await db.user.findUnique({ where: { email } })) return res.status(409).json({ message: 'Email sudah terdaftar' });
    const user = await db.user.create({ data: { name, email, password: await bcrypt.hash(password, 10) } });
    res.status(201).json({ token: sign(user), user: safe(user) });
  });

router.post('/login',
  body('email').isEmail().withMessage('Email tidak valid').normalizeEmail(),
  body('password').notEmpty().withMessage('Password wajib diisi'), validate,
  async (req, res) => {
    const user = await db.user.findUnique({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
      return res.status(401).json({ message: 'Email atau password salah' });
    res.json({ token: sign(user), user: safe(user) });
  });

router.get('/me', auth, async (req, res) => res.json(safe(await db.user.findUnique({ where: { id: req.user.id } }))));

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File avatar wajib diisi' });
  const user = await db.user.update({ where: { id: req.user.id }, data: { avatar: '/uploads/' + req.file.filename } });
  res.json(safe(user));
});
module.exports = router;
