import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import globalStyles, { colors } from '../styles/globalStyles';

const administrationAnnouncements = [
  {
    id: '1',
    image: 'https://unsplash.com/photos/fjWOxzYGSA8/download?force=true&w=1200',
    header: 'Rooftop renovation',
    text: 'The rooftop will be renovated starting September 21, starting between staircase D and F. Please empty your rooftop storage before this date. Thank you for your understanding.',
  },
  {
    id: '2',
    image: 'https://unsplash.com/photos/Q3YmoeoQ9g0/download?force=true&w=1200',
    header: 'Knuthenborg Safari Park Trip',
    text: 'The tenant committee is organizing a trip to Knuthenborg Safari Park on September 30. Sign up at the office to reserve your spot. There are 30 spots available. The trip is free for all tenants.',
  },
];

const tenantAnnouncements = [
  {
    id: '1',
    author: 'Ilisabeth, 3B',
    header: 'Birthday party',
    text: 'Hello neighbors! I will be hosting my birthday party with my friends on October 5. I therefore want to warn you that there might be some noises during the evening. I will make sure to keep it under control. Best regards, Ilisabeth.',
  },
  {
    id: '2',
    author: 'Rasmus, 2C',
    header: 'Anyone need a dinner table?',
    text: 'Hello, we are renovating our living room. We brought some new furniture and are wondering if anyone could use a old dinner table? It has a few marks, but is still in good condition. Please contact me if you are interested. Best regards, Rasmus.',
  },
  {
    id: '3',
    author: 'Julie, 1A',
    header: 'Looking for a roommate',
    text: 'Hello, we are looking for a roommate to share our apartment. We are both in our 20s and are looking for someone who is also in their 20s and is looking for a place to live. Please contact us if you know anyone who might be interested. Best regards, Julie.',
  },
];

export default function Announcement() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Announcements</Text>

      <Text style={styles.sectionTitle}>Administration announcements</Text>
      <View style={styles.sectionDivider} />

      {administrationAnnouncements.map((announcement) => (
        <View key={announcement.id} style={styles.announcementCard}>
          <Image
            accessibilityLabel={`${announcement.header} announcement image`}
            source={{ uri: announcement.image }}
            style={styles.announcementImage}
          />
          <View style={styles.announcementContent}>
            <Text style={styles.announcementHeader}>{announcement.header}</Text>
            <Text style={styles.announcementText}>{announcement.text}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Tenant announcements</Text>
  <View style={styles.sectionDivider} />

      {tenantAnnouncements.map((announcement) => (
        <View key={announcement.id} style={styles.tenantAnnouncementCard}>
          <Text style={styles.announcementHeader}>{announcement.header}</Text>
          <Text style={styles.author}>{announcement.author}</Text>
          <Text style={styles.announcementText}>{announcement.text}</Text>
        </View>
      ))}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.scrollContent,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 20,
  },
  sectionTitle: {
    ...globalStyles.sectionTitle,
    marginBottom: 12,
  },
  sectionDivider: {
    ...globalStyles.divider,
    marginBottom: 16,
  },
  announcementCard: {
    ...globalStyles.card,
    marginBottom: 18,
    overflow: 'hidden',
  },
  announcementImage: {
    backgroundColor: colors.sandDark,
    height: 180,
    width: '100%',
  },
  announcementContent: {
    padding: 18,
  },
  announcementHeader: {
    color: colors.forest,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  announcementText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  tenantAnnouncementCard: {
    ...globalStyles.card,
    marginBottom: 18,
    padding: 18,
  },
  author: {
    color: colors.forestLight,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
});