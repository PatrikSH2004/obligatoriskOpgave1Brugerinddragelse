import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BasementRoom from './screens/basementRoom';
import RentTools from './screens/toolRent';
import Announcement from './screens/announcement';
import { colors } from './styles/globalStyles';

const tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.forest },
          headerTintColor: colors.white,
          tabBarActiveTintColor: colors.forest,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.sandLight },
        }}
      >
        <tab.Screen name="Announcements" component={Announcement} />
        <tab.Screen name="Borrow Tools" component={RentTools}/>
        <tab.Screen name="Basement Room" component={BasementRoom} />
      </tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
