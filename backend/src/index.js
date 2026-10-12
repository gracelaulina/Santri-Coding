require("dotenv").config();
const express = require('express'); const cors = require('cors'); const path = require('path');
const app = express();
app.use(cors(), express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.get('/', (req, res) => res.json({ app: 'Santri Code API', status: 'ok' }));
const wrap = (r) => { // tangkap error async di semua route
  r.stack.forEach((l) => { if (l.route) l.route.stack.forEach((s) => { const f = s.handle;
    if (f.length < 4) s.handle = (q, a, n) => Promise.resolve(f(q, a, n)).catch(n); }); }); return r; };
app.use('/api/auth', wrap(require('./routes/auth')));
app.use('/api/materials', wrap(require('./routes/materials')));
app.use('/api/submissions', wrap(require('./routes/submissions')));
app.use((err, req, res, next) => { console.error(err.message); res.status(err.status || 400).json({ message: err.message || 'Terjadi kesalahan' }); });
app.listen(process.env.PORT || 4000, () => console.log('API jalan di port', process.env.PORT || 4000));
