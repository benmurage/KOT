import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { attendanceCodes } from '../data/mockData';

const days = Array.from({ length: 7 }, (_, i) => i + 1);

export default function AttendanceScreen({ employees, attendance, onMarkAttendance, compact }) {
  const datePrefix = '2026-04-';

  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }} horizontal={!compact}>
      <View style={{ minWidth: compact ? '100%' : 850 }}>
        <Text style={styles.heading}>Attendance Register (Week Snapshot)</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.nameCell]}>Employee</Text>
          {days.map((d) => (
            <Text key={d} style={styles.headerCell}>{d}</Text>
          ))}
        </View>
        {employees.map((employee) => (
          <View key={employee.id} style={styles.row}>
            <Text style={[styles.cell, styles.nameCell]}>{employee.name}</Text>
            {days.map((day) => {
              const key = `${datePrefix}${String(day).padStart(2, '0')}`;
              const code = attendance[key]?.[employee.id] || (day === 6 ? 'OFF' : 'P');
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.cell, styles.codeChip]}
                  onPress={() => onMarkAttendance(key, employee.id, code)}
                >
                  <Text style={styles.codeText}>{code}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
        <Text style={styles.note}>Tap a code to cycle through: {attendanceCodes.join(', ')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fafafa' },
  heading: { fontWeight: '800', fontSize: 18, marginBottom: 10, color: '#0f172a' },
  headerRow: { flexDirection: 'row', backgroundColor: '#0f766e', borderRadius: 8 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e4e4e7' },
  headerCell: { color: '#fff', fontWeight: '700', width: 70, textAlign: 'center', paddingVertical: 8 },
  cell: { width: 70, textAlign: 'center', paddingVertical: 8, color: '#18181b' },
  nameCell: { width: 240, textAlign: 'left', paddingHorizontal: 8 },
  codeChip: { justifyContent: 'center', alignItems: 'center' },
  codeText: { fontWeight: '700', color: '#155e75' },
  note: { marginTop: 10, color: '#52525b', fontSize: 12 },
});
