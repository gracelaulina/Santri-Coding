import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './src/AuthContext';
import { C } from './src/config'; import { Loading } from './src/ui';
import AuthScreen from './src/screens/AuthScreen';
import MaterialsScreen from './src/screens/MaterialsScreen';
import MaterialDetailScreen from './src/screens/MaterialDetailScreen';
import SubmitScreen from './src/screens/SubmitScreen';
import SubmissionsScreen from './src/screens/SubmissionsScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator(); const Tab = createBottomTabNavigator();
const theme = { ...DarkTheme, colors: { ...DarkTheme.colors, background: C.bg, card: C.bg, primary: C.accent, text: C.ink, border: C.line } };

const MaterialsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Materi" component={MaterialsScreen} />
    <Stack.Screen name="MaterialDetail" component={MaterialDetailScreen} options={{ title: 'Detail materi' }} />
    <Stack.Screen name="Submit" component={SubmitScreen} options={{ title: 'Kumpulkan tugas' }} />
  </Stack.Navigator>);
const Tabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: C.bg, borderTopColor: C.line } }}>
    <Tab.Screen name="MateriTab" component={MaterialsStack} options={{ title: 'Materi' }} />
    <Tab.Screen name="Tugas" component={SubmissionsScreen} options={{ headerShown: true }} />
    <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: true }} />
  </Tab.Navigator>);

function Root() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  return user ? <Tabs /> : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">{(p) => <AuthScreen {...p} mode="login" />}</Stack.Screen>
      <Stack.Screen name="Register">{(p) => <AuthScreen {...p} mode="register" />}</Stack.Screen>
    </Stack.Navigator>);
}
export default function App() {
  return <AuthProvider><NavigationContainer theme={theme}><StatusBar style="light" /><Root /></NavigationContainer></AuthProvider>;
}
