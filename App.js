import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateKOT from './screens/CreateKOT';
import Approvals from './screens/Approvals';
import Kitchen from './screens/Kitchen';
import Reports from './screens/Reports';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Create KOT" component={CreateKOT} />
        <Tab.Screen name="Approvals" component={Approvals} />
        <Tab.Screen name="Kitchen" component={Kitchen} />
        <Tab.Screen name="Reports" component={Reports} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
