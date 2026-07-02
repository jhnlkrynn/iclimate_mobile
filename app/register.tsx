import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const barangays = [
  'Balibago',
  'Bagong Pook',
  'Binubusan',
  'Bungahan',
  'Calatagan',
  'Lumaniag',
  'Matabungkay',
  'Malaruhatan',
  'Prenza',
  'Puting-Kahoy',
  'San Diego',
  'Luyahan',
  'Bucal',
  'Kapito',
  'San Celestino',
  'Bugtong na Pulo',
  'Halang',
  'Jaybanga',
  'San Simon',
  'Hermana Fausta',
  'Humayingan',
];

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('Balibago');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmSize, setFarmSize] = useState('');
  const [mainCrop, setMainCrop] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!fullName.trim() || !contactNumber.trim() || !username.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please complete the required farmer account fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Password and confirm password must match.');
      return;
    }

    Alert.alert('Registration saved', 'This is a frontend-only farmer registration preview.', [
      { text: 'OK', onPress: () => router.push('/login') },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Farmer Registration</Text>
      <Text style={styles.subtitle}>Create a farmer profile for MAO Lian information services.</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          placeholderTextColor="#6B6B6B"
        />
        <TextInput
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
          placeholder="Contact number"
          placeholderTextColor="#6B6B6B"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Complete address"
          placeholderTextColor="#6B6B6B"
          multiline
        />

        <Text style={styles.label}>Barangay</Text>
        <View style={styles.barangayGrid}>
          {barangays.map((item) => {
            const selected = barangay === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.barangayButton, selected && styles.barangayButtonSelected]}
                onPress={() => setBarangay(item)}>
                <Text style={[styles.barangayText, selected && styles.barangayTextSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Farm Information</Text>
        <TextInput
          style={styles.input}
          value={farmLocation}
          onChangeText={setFarmLocation}
          placeholder="Farm location"
          placeholderTextColor="#6B6B6B"
        />
        <TextInput
          style={styles.input}
          value={farmSize}
          onChangeText={setFarmSize}
          placeholder="Farm size in hectares"
          placeholderTextColor="#6B6B6B"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          value={mainCrop}
          onChangeText={setMainCrop}
          placeholder="Main crop or commodity"
          placeholderTextColor="#6B6B6B"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#6B6B6B"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#6B6B6B"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor="#6B6B6B"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
        <Text style={styles.primaryButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F8F4',
  },
  content: {
    padding: 20,
    paddingBottom: 36,
  },
  title: {
    color: '#2E7D32',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 18,
  },
  subtitle: {
    color: '#1B1B1B',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 14,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  sectionTitle: {
    color: '#2E7D32',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 12,
  },
  label: {
    color: '#1B1B1B',
    fontSize: 14,
    fontWeight: '800',
    marginTop: 4,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C8D8C8',
    borderWidth: 1,
    borderRadius: 8,
    color: '#1B1B1B',
    fontSize: 15,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  barangayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  barangayButton: {
    borderColor: '#C8D8C8',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  barangayButtonSelected: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  barangayText: {
    color: '#1B1B1B',
    fontSize: 13,
    fontWeight: '700',
  },
  barangayTextSelected: {
    color: '#FFFFFF',
  },
  primaryButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 18,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  cancelButton: {
    borderColor: '#1976D2',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '800',
  },
});
