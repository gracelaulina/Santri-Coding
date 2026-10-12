import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { api } from '../api';
import { Screen, H1, Muted, Input, Button, ErrorText } from '../ui';

export default function SubmitScreen({ route, navigation }) {
  const { materialId, title: materi } = route.params;
  const [title, setTitle] = useState(''); const [note, setNote] = useState(''); const [file, setFile] = useState(null);
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const pick = async () => {
    const r = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });
    if (!r.canceled) setFile(r.assets[0]);
  };
  const send = async () => {
    setErr(''); setBusy(true);
    try { await api.submit({ title, note, materialId }, file); Alert.alert('Tugas terkirim'); navigation.popToTop(); }
    catch (e) { setErr(e.message); } setBusy(false);
  };
  return (
    <Screen><ScrollView keyboardShouldPersistTaps="handled">
      <H1>Kumpulkan tugas</H1><Muted style={{ marginBottom: 16 }}>Materi: {materi}</Muted>
      <Input placeholder="Judul tugas" value={title} onChangeText={setTitle} />
      <Input placeholder="Catatan untuk ustadz (opsional)" multiline value={note} onChangeText={setNote} />
      <Button variant="ghost" title={file ? `File: ${file.name}` : 'Pilih file (maks 5 MB)'} onPress={pick} />
      <ErrorText>{err}</ErrorText>
      <Button title="Kirim tugas" onPress={send} loading={busy} />
    </ScrollView></Screen>
  );
}
