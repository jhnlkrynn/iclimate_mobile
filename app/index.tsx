import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const features = [
  'Weather impact analysis and rice yield prediction',
  'Role-based farmer, MAO, and IT expert dashboards',
  'Advisories, announcements, community feed, messages, and notifications',
  'Climate records, production reports, risk areas, users, and system logs',
];

export default function LandingScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.brandBlock}>
        <Text style={styles.brand}>iClimate</Text>
        <Text style={styles.name}>Weather Impact and Rice Yield System for Lian, Batangas</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Mobile agriculture service hub</Text>
        <Text style={styles.heroText}>
          A clean Android-first experience for farmers, MAO personnel, and IT experts, ready to connect to the Laravel API.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Coverage</Text>
        {features.map((item) => (
          <Text key={item} style={styles.bullet}>- {item}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Role Preview</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.roleCard} onPress={() => router.push('/farmer-dashboard' as never)}>
            <Text style={styles.roleTitle}>Farmer</Text>
            <Text style={styles.roleText}>Advisories, risks, AI help, feed, messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roleCard} onPress={() => router.push('/mao-dashboard' as never)}>
            <Text style={styles.roleTitle}>MAO</Text>
            <Text style={styles.roleText}>Monitoring, data entry, reports, communication</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.roleCard} onPress={() => router.push('/it-dashboard' as never)}>
            <Text style={styles.roleTitle}>IT Expert</Text>
            <Text style={styles.roleText}>Users, status, reports, logs, settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/login' as never)}>
        <Text style={styles.primaryButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/register' as never)}>
        <Text style={styles.secondaryButtonText}>Register Farmer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F8F4' },
  content: { padding: 20, paddingBottom: 36 },
  brandBlock: { alignItems: 'center', paddingVertical: 18 },
  brand: { color: '#2E7D32', fontSize: 42, fontWeight: '900' },
  name: { color: '#1B1B1B', fontSize: 17, lineHeight: 24, fontWeight: '800', textAlign: 'center', marginTop: 8 },
  hero: { backgroundColor: '#2E7D32', borderRadius: 8, padding: 18 },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 8 },
  heroText: { color: '#FFFFFF', fontSize: 15, lineHeight: 22 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginTop: 14 },
  sectionTitle: { color: '#2E7D32', fontSize: 18, fontWeight: '800', marginBottom: 12 },
  bullet: { color: '#1B1B1B', fontSize: 15, lineHeight: 23, marginBottom: 6 },
  grid: { gap: 10 },
  roleCard: { borderColor: '#C8D8C8', borderWidth: 1, borderRadius: 8, padding: 14 },
  roleTitle: { color: '#1976D2', fontSize: 17, fontWeight: '800', marginBottom: 4 },
  roleText: { color: '#1B1B1B', fontSize: 14, lineHeight: 20 },
  primaryButton: { backgroundColor: '#2E7D32', borderRadius: 8, paddingVertical: 15, alignItems: 'center', marginTop: 18 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  secondaryButton: { borderColor: '#1976D2', borderWidth: 1, borderRadius: 8, paddingVertical: 15, alignItems: 'center', marginTop: 12, backgroundColor: '#FFFFFF' },
  secondaryButtonText: { color: '#1976D2', fontSize: 16, fontWeight: '800' },
});
