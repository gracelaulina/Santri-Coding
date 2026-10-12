import React, { useState } from 'react';
import { Screen, H1, Muted, Input, Button, ErrorText } from '../ui';
import { useAuth } from '../AuthContext';

export default function AuthScreen({ mode = 'login', navigation }) {
  const { login, register } = useAuth(); const isLogin = mode === 'login';
  const [f, setF] = useState({ name: '', email: '', password: '' }); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const set = (k) => (v) => setF({ ...f, [k]: v });
  const submit = async () => {
    setErr(''); setBusy(true);
    try { isLogin ? await login(f) : await register(f); } catch (e) { setErr(e.message); } setBusy(false);
  };
  return (
    <Screen style={{ justifyContent: 'center' }}>
      <H1>{isLogin ? 'Masuk' : 'Daftar santri baru'}</H1>
      <Muted style={{ marginBottom: 24 }}>{isLogin ? 'Lanjutkan belajar codingmu.' : 'Buat akun untuk mulai mengumpulkan tugas.'}</Muted>
      {!isLogin && <Input placeholder="Nama lengkap" value={f.name} onChangeText={set('name')} />}
      <Input placeholder="Email" autoCapitalize="none" keyboardType="email-address" value={f.email} onChangeText={set('email')} />
      <Input placeholder="Password" secureTextEntry value={f.password} onChangeText={set('password')} />
      <ErrorText>{err}</ErrorText>
      <Button title={isLogin ? 'Masuk' : 'Daftar'} onPress={submit} loading={busy} />
      <Button variant="ghost" title={isLogin ? 'Belum punya akun? Daftar' : 'Sudah punya akun? Masuk'}
        onPress={() => navigation.navigate(isLogin ? 'Register' : 'Login')} />
    </Screen>
  );
}
