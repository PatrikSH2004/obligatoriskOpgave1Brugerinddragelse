import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const statusDetails = {
  rented: {
    label: 'Rented',
    color: '#d64545',
  },
  available: {
    label: 'Available',
    color: '#4cae61',
  },
};

const initialTools = [
  { id: 'T1', name: 'Power drill', status: 'rented' },
  { id: 'T2', name: 'Circular saw', status: 'rented' },
  { id: 'T3', name: 'Jigsaw', status: 'available' },
  { id: 'T4', name: 'Sander', status: 'available' },
  { id: 'T5', name: 'Ladder', status: 'rented' },
  { id: 'T6', name: 'Toolbox', status: 'available' },
];

export default function RentTools() {
  const [tools, setTools] = useState(initialTools);

  function rentTool(toolId) {
    setTools((currentTools) =>
      currentTools.map((tool) =>
        tool.id === toolId && tool.status === 'available'
          ? { ...tool, status: 'rented' }
          : tool,
      ),
    );
    Alert.alert('Tool rented', `The ${tools.find((tool) => tool.id === toolId)?.name} can be collected in office hours. Remember to return it to avoid additional fees.`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rent tools</Text>
      <Text style={styles.subtitle}>Check the current status and rent an available tool.</Text>

      <View style={styles.legend}>
        {Object.entries(statusDetails).map(([status, details]) => (
          <View key={status} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: details.color }]} />
            <Text style={styles.legendText}>{details.label}</Text>
          </View>
        ))}
      </View>

      <FlatList
        contentContainerStyle={styles.toolList}
        data={tools}
        keyExtractor={(tool) => tool.id}
        renderItem={({ item: tool }) => {
          const details = statusDetails[tool.status];
          const isAvailable = tool.status === 'available';

          return (
            <Pressable
              accessibilityLabel={`${isAvailable ? 'Rent' : details.label} ${tool.name}`}
              accessibilityRole="button"
              disabled={!isAvailable}
              onPress={() => rentTool(tool.id)}
              style={({ pressed }) => [
                styles.toolRow,
                { backgroundColor: details.color },
                pressed && isAvailable && styles.pressedToolRow,
              ]}
            >
              <View style={styles.toolInfo}>
                <View style={[styles.statusDot, { backgroundColor: details.color }]} />
                <View>
                  <Text style={styles.toolName}>{tool.name}</Text>
                  <Text style={styles.statusText}>{details.label}</Text>
                </View>
              </View>

              {isAvailable && <Text style={styles.actionHint}>Tap to rent</Text>}
            </Pressable>
          );
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f4',
    padding: 24,
    paddingTop: 64,
  },
  title: {
    color: '#1f2a24',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#607067',
    fontSize: 15,
    lineHeight: 22,
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
    color: '#526058',
    fontSize: 13,
  },
  toolList: {
    gap: 12,
    paddingBottom: 24,
  },
  toolRow: {
    alignItems: 'center',
    borderColor: '#e1e7e2',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 68,
    paddingHorizontal: 16,
  },
  toolInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 10,
  },
  statusDot: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  toolName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    color: '#ffffff',
    fontSize: 13,
    marginTop: 2,
  },
  pressedToolRow: {
    backgroundColor: '#398c4d',
  },
  actionHint: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});