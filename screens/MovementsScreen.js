import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function MovementsScreen({ movements, employees }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>Employee Movements & Reconciliation</Text>
      <View style={styles.card}>
        {movements.map((move) => {
          const employee = employees.find((e) => e.id === move.employeeId);
          return (
            <View key={move.id} style={styles.item}>
              <Text style={styles.title}>{employee?.name}</Text>
              <Text style={styles.meta}>{move.from} → {move.to} • Effective: {move.effectiveDate}</Text>
              <Text style={[styles.badge, move.status === 'Pending' ? styles.pending : styles.approved]}>{move.status}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fafafa' },
  heading: { fontWeight: '800', fontSize: 18, marginBottom: 10, color: '#0f172a' },
  card: { borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 12, backgroundColor: '#fff' },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#f4f4f5' },
  title: { fontWeight: '700', color: '#18181b' },
  meta: { color: '#52525b', fontSize: 12, marginTop: 2 },
  badge: { marginTop: 6, fontWeight: '700', fontSize: 12 },
  pending: { color: '#b45309' },
  approved: { color: '#166534' },
});
