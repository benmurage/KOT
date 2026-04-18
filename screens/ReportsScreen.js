import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import LineGraph from '../components/LineGraph';

export default function ReportsScreen({ employees, appState }) {
  const eto = [
    { label: 'W1', value: 0.9 },
    { label: 'W2', value: 1.3 },
    { label: 'W3', value: 1.8 },
    { label: 'W4', value: 1.2 },
  ];

  const exportCsv = () => {
    const rows = ['EmployeeID,Name,Line,Shift'];
    employees.forEach((e) => rows.push(`${e.id},${e.name},${e.line},${e.shift}`));
    Alert.alert('Excel Export (CSV preview)', rows.slice(0, 6).join('\n'));
  };

  const importCsv = () => {
    Alert.alert('Excel Import', 'Hook ready: connect MAS Employee Summary parser/API in backend service.');
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>KPI Reports</Text>
      <LineGraph title="Weekly ETO% (Line graph)" points={eto} />
      <View style={styles.card}>
        <Text style={styles.metric}>Employees: {employees.length}</Text>
        <Text style={styles.metric}>Leave records: {appState.leaves.length}</Text>
        <Text style={styles.metric}>Movement records: {appState.movements.length}</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={exportCsv}><Text style={styles.btnText}>Export to Excel/CSV</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.secondary]} onPress={importCsv}><Text style={styles.btnText}>Import Employees</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fafafa' },
  heading: { fontWeight: '800', fontSize: 18, marginBottom: 10, color: '#0f172a' },
  card: { borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 12, backgroundColor: '#fff', padding: 12, marginBottom: 12 },
  metric: { fontWeight: '600', marginBottom: 4, color: '#334155' },
  row: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  btn: { backgroundColor: '#0d9488', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12 },
  secondary: { backgroundColor: '#2563eb' },
  btnText: { color: '#fff', fontWeight: '700' },
});
