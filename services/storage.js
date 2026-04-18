import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_STATE_KEY = 'digital_registers_state_v1';
const USER_KEY = 'digital_registers_user_v1';

export async function saveAppState(state) {
  await AsyncStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
}

export async function loadAppState() {
  const saved = await AsyncStorage.getItem(APP_STATE_KEY);
  return saved ? JSON.parse(saved) : null;
}

export async function saveSession(user) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function loadSession() {
  const saved = await AsyncStorage.getItem(USER_KEY);
  return saved ? JSON.parse(saved) : null;
}

export async function clearSession() {
  await AsyncStorage.removeItem(USER_KEY);
}
