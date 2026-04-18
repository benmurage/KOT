import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LineGraph({ title, points = [], height = 120 }) {
  if (!points.length) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.empty}>No data available</Text>
      </View>
    );
  }

  const max = Math.max(...points.map((p) => p.value), 1);
  const min = Math.min(...points.map((p) => p.value), 0);
  const range = Math.max(max - min, 1);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.chart, { height }]}> 
        {points.map((point, idx) => {
          const xPercent = points.length === 1 ? 0 : (idx / (points.length - 1)) * 100;
          const yPercent = ((point.value - min) / range) * 100;
          const top = height - (yPercent / 100) * (height - 20) - 10;

          const prev = points[idx - 1];
          let connector = null;
          if (prev) {
            const prevX = ((idx - 1) / (points.length - 1)) * 100;
            const prevY = ((prev.value - min) / range) * 100;
            const prevTop = height - (prevY / 100) * (height - 20) - 10;
            const dx = (xPercent - prevX) * 2.2;
            const dy = top - prevTop;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            connector = (
              <View
                key={`line-${point.label}`}
                style={{
                  position: 'absolute',
                  left: `${prevX}%`,
                  top: prevTop + 2,
                  width: length,
                  height: 2,
                  backgroundColor: '#0d9488',
                  transform: [{ translateX: 5 }, { rotateZ: `${angle}deg` }],
                }}
              />
            );
          }

          return (
            <React.Fragment key={point.label}>
              {connector}
              <View style={[styles.dot, { left: `${xPercent}%`, top }]} />
              <Text style={[styles.xLabel, { left: `${xPercent}%` }]}>{point.label}</Text>
            </React.Fragment>
          );
        })}
      </View>
      <View style={styles.legendRow}>
        <Text style={styles.legend}>Min: {min.toFixed(2)}</Text>
        <Text style={styles.legend}>Max: {max.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#d4d4d8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  chart: {
    borderBottomWidth: 1,
    borderColor: '#e4e4e7',
    marginBottom: 20,
    position: 'relative',
  },
  dot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#14b8a6',
    marginLeft: -5,
  },
  xLabel: {
    position: 'absolute',
    bottom: -20,
    fontSize: 10,
    color: '#52525b',
    marginLeft: -10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legend: {
    fontSize: 12,
    color: '#52525b',
  },
  empty: {
    color: '#71717a',
    fontSize: 13,
  },
});
