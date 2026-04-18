import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function VOPScreen({ vops, employees }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>Vacation of Post (VOP)</Text>
      <View style={styles.card}>
        {vops.map((record) => {
          const employee = employees.find((e) => e.id === record.employeeId);
          return (
            <View key={record.id} style={styles.item}>
              <Text style={styles.title}>{employee?.name}</Text>
              <Text style={styles.meta}>Stage: {record.stage}</Text>
              <Text style={styles.meta}>Requested: {record.requestedDate} • Effective: {record.effectiveDate}</Text>
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
});
