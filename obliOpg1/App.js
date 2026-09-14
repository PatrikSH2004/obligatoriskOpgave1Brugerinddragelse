import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BasementRoom from './screens/basementRoom';
import RentTools from './screens/toolRent';
import Announcement from './screens/announcement';

const tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <tab.Navigator>
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
