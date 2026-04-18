import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  function submit() {
    const ok = onLogin(username.trim(), password.trim());
    if (!ok) setError('Invalid credentials. Try admin/admin123, hr/hr123, or linelead/line123.');
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>Digital Registers</Text>
        <Text style={styles.subtitle}>MAS Intimates Kenya Workforce Ops</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
        {!!error && <Text style={styles.error}>{error}</Text>}
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#f4f4f5' },
  card: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#e4e4e7' },
  title: { fontSize: 24, fontWeight: '800', color: '#18181b' },
  subtitle: { fontSize: 13, color: '#52525b', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 10, marginTop: 8 },
  btn: { marginTop: 14, backgroundColor: '#0d9488', borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  error: { color: '#dc2626', fontSize: 12, marginTop: 8 },
});
