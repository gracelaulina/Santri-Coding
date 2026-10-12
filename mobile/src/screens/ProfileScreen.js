import React, { useState } from 'react';
import { Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { api } from '../api'; import { BASE_URL, C } from '../config'; import { useAuth } from '../AuthContext';
import { Screen, H1, Muted, Button, ErrorText } from '../ui';

export default function ProfileScreen() {
  const { user, setUser, logout } = useAuth(); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const changeAvatar = async () => {
    const r = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.6, allowsEditing: true, aspect: [1, 1] });
    if (r.canceled) return;
    setBusy(true); setErr('');
    try { const a = r.assets[0]; setUser(await api.avatar({ uri: a.uri, name: 'avatar.jpg', mimeType: 'image/jpeg' })); }
    catch (e) { setErr(e.message); } setBusy(false);
  };
  return (
    <Screen style={{ alignItems: 'center', paddingTop: 48 }}>
      <View style={{ width: 110, height: 110, borderRadius: 55, backgroundColor: C.card, overflow: 'hidden', marginBottom: 16 }}>
        {user.avatar && <Image source={{ uri: BASE_URL + user.avatar }} style={{ width: 110, height: 110 }} />}
      </View>
      <H1>{user.name}</H1><Muted style={{ marginBottom: 24 }}>{user.email} · {user.role === 'USTADZ' ? 'Ustadz' : 'Santri'}</Muted>
      <ErrorText>{err}</ErrorText>
      <View style={{ width: '100%' }}>
        <Button variant="ghost" title="Ganti foto profil" onPress={changeAvatar} loading={busy} />
        <Button title="Keluar" onPress={logout} />
      </View>
    </Screen>
  );
}
