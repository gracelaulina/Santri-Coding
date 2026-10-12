import React from 'react';
import { Text, TextInput, Pressable, View, ActivityIndicator, StyleSheet } from 'react-native';
import { C } from './config';

export const Screen = ({ children, style }) => <View style={[{ flex: 1, backgroundColor: C.bg, padding: 20 }, style]}>{children}</View>;
export const H1 = ({ children }) => <Text style={{ color: C.ink, fontSize: 28, fontWeight: '800', marginBottom: 6 }}>{children}</Text>;
export const Muted = ({ children, style }) => <Text style={[{ color: C.mute, fontSize: 14, lineHeight: 20 }, style]}>{children}</Text>;
export const Input = (p) => <TextInput placeholderTextColor={C.mute} {...p}
  style={{ backgroundColor: C.card, color: C.ink, borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: C.line }} />;
export const Button = ({ title, onPress, loading, variant }) => (
  <Pressable onPress={onPress} disabled={loading} style={({ pressed }) => [s.btn, variant === 'ghost' && s.ghost, pressed && { opacity: 0.8 }]}>
    {loading ? <ActivityIndicator color="#fff" /> : <Text style={[s.btnText, variant === 'ghost' && { color: C.accent }]}>{title}</Text>}
  </Pressable>);
export const ErrorText = ({ children }) => children ? <Text style={{ color: C.danger, marginBottom: 12 }}>{children}</Text> : null;
export const Loading = () => <View style={{ flex: 1, backgroundColor: C.bg, justifyContent: 'center' }}><ActivityIndicator color={C.accent} size="large" /></View>;
export const Empty = ({ text }) => <Muted style={{ textAlign: 'center', marginTop: 40 }}>{text}</Muted>;
const s = StyleSheet.create({
  btn: { backgroundColor: C.accent, padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 4, marginBottom: 8 },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: C.accent },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
