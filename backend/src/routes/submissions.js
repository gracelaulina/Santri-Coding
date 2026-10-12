const router = require('express').Router(); const { body } = require('express-validator'); const db = require('../db');
const { auth, upload, validate } = require('../middleware');
router.use(auth);

router.get('/', async (req, res) => {
  const where = req.user.role === 'USTADZ' ? {} : { userId: req.user.id };
  res.json(await db.submission.findMany({ where, orderBy: { createdAt: 'desc' },
    include: { material: { select: { title: true } }, user: { select: { name: true } } } }));
});
router.post('/', upload.single('file'),
  body('title').trim().notEmpty().withMessage('Judul tugas wajib diisi'),
  body('materialId').isInt().withMessage('Pilih materi terlebih dahulu'), validate,
  async (req, res) => {
    const s = await db.submission.create({ data: { title: req.body.title, note: req.body.note || null,
      materialId: +req.body.materialId, userId: req.user.id, fileUrl: req.file ? '/uploads/' + req.file.filename : null } });
    res.status(201).json(s);
  });
router.delete('/:id', async (req, res) => {
  const s = await db.submission.findUnique({ where: { id: +req.params.id } });
  if (!s || (s.userId !== req.user.id && req.user.role !== 'USTADZ')) return res.status(404).json({ message: 'Tugas tidak ditemukan' });
  await db.submission.delete({ where: { id: s.id } }); res.status(204).end();
});
module.exports = router;
