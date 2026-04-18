import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import LineGraph from '../components/LineGraph';

export default function DashboardScreen({ trendData }) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.heading}>Absenteeism & KPI Dashboard</Text>
      <LineGraph title="Daily Absenteeism % (Line graph)" points={trendData.absenteeism} />
      <LineGraph title="Headcount Variance (Plan vs Actual)" points={trendData.headcountVariance} />
      <View style={styles.targets}>
        <Text style={styles.target}>PLAN Target: 1.5%</Text>
        <Text style={styles.target}>PDCA Limit: 1.75%</Text>
        <Text style={styles.target}>MAX Threshold: 2.0%</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fafafa' },
  heading: { fontWeight: '800', fontSize: 18, marginBottom: 10, color: '#0f172a' },
  targets: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 12, padding: 12 },
  target: { color: '#374151', marginBottom: 6 },
});
