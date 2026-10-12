import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from './config';

export const tokenStore = {
  get: () => SecureStore.getItemAsync('token'),
  set: (t) => SecureStore.setItemAsync('token', t),
  clear: () => SecureStore.deleteItemAsync('token'),
};

async function request(path, { method = 'GET', body, form } = {}) {
  const headers = {}; const token = await tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers['Content-Type'] = 'application/json';
  let res;
  try { res = await fetch(BASE_URL + '/api' + path, { method, headers, body: form || (body && JSON.stringify(body)) }); }
  catch { throw new Error('Tidak bisa terhubung ke server. Cek BASE_URL dan jaringan.'); }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Terjadi kesalahan');
  return data;
}
// file: { uri, name, mimeType }
export const toForm = (fields, field, file) => {
  const f = new FormData();
  Object.entries(fields).forEach(([k, v]) => v != null && f.append(k, String(v)));
  if (file) f.append(field, { uri: file.uri, name: file.name || 'upload.jpg', type: file.mimeType || 'application/octet-stream' });
  return f;
};
export const api = {
  login: (b) => request('/auth/login', { method: 'POST', body: b }),
  register: (b) => request('/auth/register', { method: 'POST', body: b }),
  me: () => request('/auth/me'),
  avatar: (file) => request('/auth/avatar', { method: 'POST', form: toForm({}, 'avatar', file) }),
  materials: () => request('/materials'),
  material: (id) => request('/materials/' + id),
  submissions: () => request('/submissions'),
  submit: (fields, file) => request('/submissions', { method: 'POST', form: toForm(fields, 'file', file) }),
  removeSubmission: (id) => request('/submissions/' + id, { method: 'DELETE' }),
};
