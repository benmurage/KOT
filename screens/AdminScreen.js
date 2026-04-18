import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function AdminScreen({ user, auditTrail }) {
  const capabilities = [
    'Persistent local database enabled with AsyncStorage (swap-ready for Supabase).',
    'Role-based login scaffold with Admin / HR / Line Leader.',
    'Audit trail events captured for attendance edits.',
    'Realtime sync hook planned: add WebSocket/polling in data layer.',
    'Email notifications hook planned for approvals and alerts.',
    'Historical reporting architecture prepared with date-keyed records.',
  ];

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>Admin & Governance</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Current User</Text>
        <Text style={styles.meta}>{user.username} • {user.role}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Implemented Improvements</Text>
        {capabilities.map((c) => <Text key={c} style={styles.meta}>• {c}</Text>)}
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Recent Audit Trail</Text>
        {auditTrail.length ? auditTrail.slice(-6).reverse().map((entry, index) => (
          <Text key={`${entry.timestamp}-${index}`} style={styles.meta}>• {entry.timestamp} — {entry.message}</Text>
        )) : <Text style={styles.meta}>No changes yet.</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fafafa' },
  heading: { fontWeight: '800', fontSize: 18, marginBottom: 10, color: '#0f172a' },
  card: { borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 12, backgroundColor: '#fff', padding: 12, marginBottom: 12 },
  title: { fontWeight: '700', marginBottom: 8, color: '#0f172a' },
  meta: { color: '#475569', fontSize: 13, marginBottom: 4 },
});
