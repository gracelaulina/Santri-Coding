const router = require('express').Router(); const { body, param } = require('express-validator'); const db = require('../db');
const { auth, onlyUstadz, validate } = require('../middleware');
router.use(auth);

router.get('/', async (req, res) => res.json(await db.material.findMany({ orderBy: { createdAt: 'desc' } })));
router.get('/:id', param('id').isInt(), validate, async (req, res) => {
  const m = await db.material.findUnique({ where: { id: +req.params.id } });
  m ? res.json(m) : res.status(404).json({ message: 'Materi tidak ditemukan' });
});
const rules = [body('title').trim().notEmpty().withMessage('Judul wajib diisi'),
  body('content').trim().notEmpty().withMessage('Isi materi wajib diisi'),
  body('level').optional().isIn(['Pemula', 'Menengah', 'Lanjut']).withMessage('Level tidak valid'), validate];
router.post('/', onlyUstadz, rules, async (req, res) => res.status(201).json(await db.material.create({ data: req.body })));
router.put('/:id', onlyUstadz, rules, async (req, res) => res.json(await db.material.update({ where: { id: +req.params.id }, data: req.body })));
router.delete('/:id', onlyUstadz, async (req, res) => { await db.submission.deleteMany({ where: { materialId: +req.params.id } });
  await db.material.delete({ where: { id: +req.params.id } }); res.status(204).end(); });
module.exports = router;
