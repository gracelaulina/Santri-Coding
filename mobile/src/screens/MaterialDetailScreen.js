import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { api } from '../api';
import { Screen, H1, Muted, Button, Loading, ErrorText } from '../ui';

export default function MaterialDetailScreen({ route, navigation }) {
  const [m, setM] = useState(null); const [err, setErr] = useState('');
  useEffect(() => { api.material(route.params.id).then(setM).catch((e) => setErr(e.message)); }, []);
  if (err) return <Screen><ErrorText>{err}</ErrorText></Screen>;
  if (!m) return <Loading />;
  return (
    <Screen><ScrollView>
      <H1>{m.title}</H1><Muted style={{ marginBottom: 16 }}>Level {m.level}</Muted>
      <Muted style={{ fontSize: 16, lineHeight: 24, marginBottom: 24 }}>{m.content}</Muted>
      <Button title="Kumpulkan tugas materi ini" onPress={() => navigation.navigate('Submit', { materialId: m.id, title: m.title })} />
    </ScrollView></Screen>
  );
}
