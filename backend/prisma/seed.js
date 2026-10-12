const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs');
const db = new PrismaClient();
(async () => {
  await db.user.upsert({ where: { email: 'ustadz@santri.dev' }, update: {},
    create: { name: 'Ustadz Coding', email: 'ustadz@santri.dev', role: 'USTADZ', password: await bcrypt.hash('password123', 10) } });
  const items = [
    ['Dasar HTML', 'Pemula', 'Kenali tag, atribut, dan struktur halaman web.'],
    ['JavaScript Pertama', 'Pemula', 'Variabel, fungsi, array, dan DOM.'],
    ['REST API dengan Express', 'Menengah', 'Buat endpoint CRUD dan validasi input.'],
    ['React Native Navigation', 'Menengah', 'Stack dan tab navigator untuk aplikasi mobile.'],
  ];
  if (!(await db.material.count())) for (const [title, level, content] of items) await db.material.create({ data: { title, level, content } });
  console.log('Seed selesai. Login: ustadz@santri.dev / password123');
})().finally(() => db.$disconnect());
