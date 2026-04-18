import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { initialEmployees, initialState, initialUsers, attendanceCodes } from './data/mockData';
import { clearSession, loadAppState, loadSession, saveAppState, saveSession } from './services/storage';
import LoginScreen from './screens/LoginScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import DashboardScreen from './screens/DashboardScreen';
import LeaveScreen from './screens/LeaveScreen';
import MovementsScreen from './screens/MovementsScreen';
import VOPScreen from './screens/VOPScreen';
import ReportsScreen from './screens/ReportsScreen';
import AdminScreen from './screens/AdminScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const { width } = useWindowDimensions();
  const compact = width < 900;
  const [booting, setBooting] = useState(true);
  const [user, setUser] = useState(null);
  const [employees] = useState(initialEmployees);
  const [appState, setAppState] = useState(initialState);

  useEffect(() => {
    async function bootstrap() {
      const [savedSession, savedState] = await Promise.all([loadSession(), loadAppState()]);
      if (savedSession) setUser(savedSession);
      if (savedState) setAppState(savedState);
      setBooting(false);
    }
    bootstrap();
  }, []);

  useEffect(() => {
    if (!booting) saveAppState(appState);
  }, [appState, booting]);

  const trends = useMemo(() => ({
    absenteeism: [
      { label: '1', value: 1.4 },
      { label: '2', value: 1.9 },
      { label: '3', value: 1.6 },
      { label: '4', value: 1.3 },
      { label: '5', value: 1.5 },
      { label: '6', value: 1.7 },
      { label: '7', value: 1.2 },
    ],
    headcountVariance: [
      { label: 'W1', value: 12 },
      { label: 'W2', value: 8 },
      { label: 'W3', value: 10 },
      { label: 'W4', value: 6 },
    ],
  }), []);

  const addAudit = (message) => {
    setAppState((prev) => ({
      ...prev,
      auditTrail: [...prev.auditTrail, { timestamp: new Date().toISOString(), message }],
    }));
  };

  const onMarkAttendance = (date, employeeId, currentCode) => {
    const currentIndex = attendanceCodes.indexOf(currentCode);
    const nextCode = attendanceCodes[(currentIndex + 1) % attendanceCodes.length];

    setAppState((prev) => ({
      ...prev,
      attendance: {
        ...prev.attendance,
        [date]: {
          ...(prev.attendance[date] || {}),
          [employeeId]: nextCode,
        },
      },
    }));

    const employee = employees.find((e) => e.id === employeeId);
    addAudit(`${user?.username || 'system'} changed ${employee?.name} attendance to ${nextCode} on ${date}`);
  };

  const onLogin = (username, password) => {
    const match = initialUsers.find((candidate) => candidate.username === username && candidate.password === password);
    if (!match) return false;
    setUser(match);
    saveSession(match);
    return true;
  };

  const onLogout = async () => {
    await clearSession();
    setUser(null);
    Alert.alert('Signed out');
  };

  if (booting) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0d9488" />
        <Text>Loading Digital Registers...</Text>
      </View>
    );
  }

  if (!user) return <LoginScreen onLogin={onLogin} />;

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerRight: () => (
            <TouchableOpacity onPress={onLogout} style={{ marginRight: 12 }}>
              <Text style={{ color: '#dc2626', fontWeight: '700' }}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarLabelStyle: { fontSize: compact ? 10 : 12 },
          tabBarStyle: { height: compact ? 65 : 72 },
        }}
      >
        <Tab.Screen name="Attendance">
          {() => <AttendanceScreen employees={employees} attendance={appState.attendance} onMarkAttendance={onMarkAttendance} compact={compact} />}
        </Tab.Screen>
        <Tab.Screen name="Absenteeism">
          {() => <DashboardScreen trendData={trends} />}
        </Tab.Screen>
        <Tab.Screen name="Leave">
          {() => <LeaveScreen leaves={appState.leaves} employees={employees} />}
        </Tab.Screen>
        <Tab.Screen name="Movements">
          {() => <MovementsScreen movements={appState.movements} employees={employees} />}
        </Tab.Screen>
        <Tab.Screen name="VOP">
          {() => <VOPScreen vops={appState.vops} employees={employees} />}
        </Tab.Screen>
        <Tab.Screen name="Reports">
          {() => <ReportsScreen employees={employees} appState={appState} />}
        </Tab.Screen>
        {(user.role === 'Admin' || user.role === 'HR') && (
          <Tab.Screen name="Admin">
            {() => <AdminScreen user={user} auditTrail={appState.auditTrail} />}
          </Tab.Screen>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
