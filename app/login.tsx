import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Role, routeForRole } from './iclimate';

const roles: Role[] = ['Farmer', 'MAO Personnel', 'IT Expert'];

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Farmer');
  const [showPassword, setShowPassword] = useState(false);

  const login = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Enter your email and password.');
      return;
    }
    Alert.alert('Login preview', `Continuing as ${role}. In production this uses Laravel Sanctum tokens and active account checks.`);
    router.push(routeForRole[role] as never);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>iClimate Login</Text>
      <Text style={styles.subtitle}>Secure role-based access for farmers, MAO personnel, and IT experts.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="name@example.gov.ph" placeholderTextColor="#66756A" autoCapitalize="none" keyboardType="email-address" />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput style={styles.passwordInput} value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#66756A" secureTextEntry={!showPassword} />
          <TouchableOpacity style={styles.showButton} onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showButtonText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Role</Text>
        <View style={styles.roleWrap}>
          {roles.map((item) => (
            <TouchableOpacity key={item} style={[styles.roleButton, role === item && styles.roleSelected]} onPress={() => setRole(item)}>
              <Text style={[styles.roleText, role === item && styles.roleTextSelected]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={login}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.links}>
          <TouchableOpacity onPress={() => router.push('/forgot-password' as never)}>
            <Text style={styles.linkText}>Forgot password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/email-verification' as never)}>
            <Text style={styles.linkText}>Email verification</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/register' as never)}>
            <Text style={styles.linkText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F8F4' },
  content: { padding: 20, paddingBottom: 36 },
  title: { color: '#2E7D32', fontSize: 30, fontWeight: '800', marginTop: 18 },
  subtitle: { color: '#1B1B1B', fontSize: 15, lineHeight: 22, marginTop: 6, marginBottom: 18 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 18 },
  label: { color: '#1B1B1B', fontSize: 14, fontWeight: '800', marginTop: 12, marginBottom: 8 },
  input: { borderColor: '#C8D8C8', borderWidth: 1, borderRadius: 8, color: '#1B1B1B', fontSize: 15, paddingHorizontal: 14, paddingVertical: 12 },
  passwordRow: { flexDirection: 'row', borderColor: '#C8D8C8', borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  passwordInput: { flex: 1, color: '#1B1B1B', fontSize: 15, paddingHorizontal: 14, paddingVertical: 12 },
  showButton: { backgroundColor: '#1976D2', paddingHorizontal: 14, justifyContent: 'center' },
  showButtonText: { color: '#FFFFFF', fontWeight: '800' },
  roleWrap: { gap: 10 },
  roleButton: { borderColor: '#C8D8C8', borderWidth: 1, borderRadius: 8, padding: 12 },
  roleSelected: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  roleText: { color: '#1B1B1B', fontSize: 15, fontWeight: '800', textAlign: 'center' },
  roleTextSelected: { color: '#FFFFFF' },
  primaryButton: { backgroundColor: '#2E7D32', borderRadius: 8, alignItems: 'center', paddingVertical: 15, marginTop: 20 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  links: { gap: 12, alignItems: 'center', marginTop: 16 },
  linkText: { color: '#1976D2', fontSize: 14, fontWeight: '800' },
});
