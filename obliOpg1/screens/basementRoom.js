import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import globalStyles, { colors } from '../styles/globalStyles';

// Data som angiver status. Dertil hvad der skal stå på knappen, og hvilken farve der skal vises.
const statusDetails = {
  occupied: {
    label: 'Occupied',
    color: colors.occupied,
  },
  reserved: {
    label: 'Reserved',
    color: colors.reserved,
  },
  available: {
    label: 'Available',
    color: colors.available,
  },
};

// Data som giver et eksempel på de forskellige rum. Der viser hvilke er optaget, og hvilke er stadigvæk åbne
const initialRooms = [
  { id: 'A1', status: 'occupied' },
  { id: 'A2', status: 'reserved' },
  { id: 'A3', status: 'available' },
  { id: 'A4', status: 'available' },
  { id: 'A5', status: 'available' },
  { id: 'A6', status: 'available' },
  { id: 'B1', status: 'available' },
  { id: 'B2', status: 'occupied' },
  { id: 'B3', status: 'available' },
  { id: 'B4', status: 'available' },
  { id: 'B5', status: 'reserved' },
  { id: 'B6', status: 'available' },
];

// Funktion som skal renders i App.js.
export default function BasementRoom() {
  {/* Funktion som tillader os at ændre tilstand i en property*/}
  const [rooms, setRooms] = useState(initialRooms);

  {/* Funktion der kan bruges til at reservere et rum. Under betingelsen af at det er tilgængeligt*/}
  function reserveRoom(roomId) {
    setRooms((currentRooms) =>
      currentRooms.map((room) =>
        room.id === roomId && room.status === 'available'
          ? { ...room, status: 'reserved' }
          : room,
      ),
    );
      {/*Simpel alert som giver information til beboreren */}
      Alert.alert('Room booked', `Room ${roomId} has been booked. Please collect the key at office hours.`);
  }

  // Det som skal returneres til App.js.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basement rooms</Text>
      <Text style={styles.subtitle}>Check the current status and reserve an available basement room for your belongings.</Text>

      {/* Bruges til at vise de forskellige statuser og hvad de betyder*/}
      <View style={styles.legend}>
        {Object.entries(statusDetails).map(([status, details]) => (
          <View key={status} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: details.color }]} />
            <Text style={styles.legendText}>{details.label}</Text>
          </View>
        ))}
      </View>
      
      {/* Bruges til at vise de forskellige rum og deres status i en liste*/}
      <FlatList
        contentContainerStyle={styles.roomList}
        data={rooms}
        keyExtractor={(room) => room.id}
        renderItem={({ item: room }) => {
          {/* Render alle kælderrum i listen*/}
          const details = statusDetails[room.status];
          const isAvailable = room.status === 'available';
          return (
            <View key={room.id} style={styles.roomRow}>
              <View style={styles.roomInfo}>
                <View style={[styles.statusDot, { backgroundColor: details.color }]} />
                <Text style={styles.roomName}>Room {room.id}</Text>
                <Text style={styles.statusText}>{details.label}</Text>
              </View>
              {/* Laver en reserveringsknap til hvert tilgængeligt rum */}
              <Pressable
                accessibilityLabel={`${isAvailable ? 'Reserve' : details.label} room ${room.id}`}
                accessibilityRole="button"
                disabled={!isAvailable}
                onPress={() => reserveRoom(room.id)}
                style={({ pressed }) => [
                  styles.reserveButton,
                  { backgroundColor: details.color },
                  pressed && isAvailable && styles.pressedButton,
                ]}
              >
                <Text style={styles.buttonText}>{isAvailable ? 'Reserve' : details.label}</Text>
              </Pressable>
            </View>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

// Styling fra globalStyles og colors, samt nogle ekstra styles til denne skærm.
const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    paddingTop: 64,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 8,
  },
  subtitle: {
    ...globalStyles.subtitle,
    marginBottom: 24,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 18,
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  legendDot: {
    borderRadius: 6,
    height: 12,
    width: 12,
  },
  legendText: {
    color: colors.forest,
    fontSize: 13,
  },
  roomList: {
    gap: 12,
    paddingBottom: 24,
  },
  roomRow: {
    alignItems: 'center',
    backgroundColor: colors.sand,
    borderColor: colors.border,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 68,
    paddingHorizontal: 16,
  },
  roomInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 10,
  },
  statusDot: {
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  roomName: {
    color: colors.forest,
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    color: colors.muted,
    fontSize: 13,
  },
  reserveButton: {
    alignItems: 'center',
    backgroundColor: '#4cae61',
    borderRadius: 7,
    justifyContent: 'center',
    marginLeft: 12,
    minHeight: 38,
    minWidth: 82,
    paddingHorizontal: 12,
  },
  pressedButton: {
    backgroundColor: colors.forestPressed,
  },
  buttonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});