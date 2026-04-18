import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import LineGraph from '../components/LineGraph';

function daysTo(dateString) {
  const now = new Date('2026-04-18T00:00:00.000Z');
  const target = new Date(`${dateString}T00:00:00.000Z`);
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export default function LeaveScreen({ leaves, employees }) {
  const monthlyTrend = [
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 55 },
    { label: 'Mar', value: 60 },
    { label: 'Apr', value: 49 },
  ];

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>Leave Tracker</Text>
      <LineGraph title="Monthly Leave Requests (Line graph)" points={monthlyTrend} />
      <View style={styles.card}>
        {leaves.map((leave) => {
          const employee = employees.find((e) => e.id === leave.employeeId);
          return (
            <View key={leave.id} style={styles.item}>
              <Text style={styles.title}>{employee?.name} • {leave.type}</Text>
              <Text style={styles.meta}>{leave.startDate} → {leave.endDate} ({leave.category})</Text>
              <Text style={styles.meta}>Return in {daysTo(leave.endDate)} day(s) • {leave.status}</Text>
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
