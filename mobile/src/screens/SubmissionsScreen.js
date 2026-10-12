import React, { useCallback, useState } from 'react';
import { FlatList, Text, View, Pressable, Alert, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api'; import { BASE_URL, C } from '../config';
import { Screen, Muted, Loading, Empty } from '../ui';

export default function SubmissionsScreen() {
  const [items, setItems] = useState(null);
  const load = () => api.submissions().then(setItems).catch((e) => { Alert.alert('Gagal memuat', e.message); setItems([]); });
  useFocusEffect(useCallback(() => { load(); }, []));
  const remove = (id) => Alert.alert('Hapus tugas?', 'Tindakan ini tidak bisa dibatalkan.', [
    { text: 'Batal' }, { text: 'Hapus', style: 'destructive', onPress: async () => { await api.removeSubmission(id); load(); } }]);
  if (!items) return <Loading />;
  return (
    <Screen style={{ padding: 0 }}>
      <FlatList data={items} keyExtractor={(s) => String(s.id)} contentContainerStyle={{ padding: 20 }}
        ListEmptyComponent={<Empty text="Belum ada tugas. Buka materi lalu kumpulkan tugas pertamamu." />}
        renderItem={({ item }) => (
          <View style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <Text style={{ color: C.ink, fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
            <Muted>{item.material.title} · {item.user.name}</Muted>
            {item.note ? <Muted style={{ marginTop: 6 }}>{item.note}</Muted> : null}
            <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
              {item.fileUrl && <Pressable onPress={() => Linking.openURL(BASE_URL + item.fileUrl)}><Text style={{ color: C.accent }}>Buka file</Text></Pressable>}
              <Pressable onPress={() => remove(item.id)}><Text style={{ color: C.danger }}>Hapus</Text></Pressable>
            </View>
          </View>)} />
    </Screen>
  );
}
