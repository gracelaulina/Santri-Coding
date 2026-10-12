import React, { useCallback, useState } from 'react';
import { FlatList, Pressable, View, Text, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../api'; import { C } from '../config';
import { Screen, Muted, Loading, Empty, ErrorText } from '../ui';

export default function MaterialsScreen({ navigation }) {
  const [items, setItems] = useState(null); const [err, setErr] = useState(''); const [refreshing, setRefreshing] = useState(false);
  const load = async () => { try { setItems(await api.materials()); setErr(''); } catch (e) { setErr(e.message); setItems([]); } };
  useFocusEffect(useCallback(() => { load(); }, []));
  if (!items) return <Loading />;
  return (
    <Screen style={{ padding: 0 }}>
      <ErrorText>{err}</ErrorText>
      <FlatList data={items} keyExtractor={(m) => String(m.id)} contentContainerStyle={{ padding: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} tintColor={C.accent}
          onRefresh={async () => { setRefreshing(true); await load(); setRefreshing(false); }} />}
        ListEmptyComponent={<Empty text="Belum ada materi." />}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('MaterialDetail', { id: item.id })}
            style={{ backgroundColor: C.card, borderRadius: 14, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: C.accent }}>
            <Text style={{ color: C.ink, fontSize: 17, fontWeight: '700' }}>{item.title}</Text>
            <Muted style={{ marginTop: 4 }} >{item.level}</Muted>
          </Pressable>)} />
    </Screen>
  );
}
