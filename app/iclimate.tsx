import { router } from 'expo-router';
import { type ReactNode, useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export type Role = 'Farmer' | 'MAO Personnel' | 'IT Expert';

type ModuleKey =
  | 'farmer-profiles'
  | 'climate-records'
  | 'rice-production'
  | 'heat-map'
  | 'advisories'
  | 'announcements'
  | 'notifications'
  | 'community'
  | 'messages'
  | 'reports'
  | 'users'
  | 'logs';

type ModuleConfig = {
  key: ModuleKey;
  title: string;
  subtitle: string;
  fields: string[];
  filters?: string[];
  records: Record<string, string>[];
  access: Role[];
};

const green = '#2E7D32';
const blue = '#1976D2';
const ink = '#1B1B1B';
const muted = '#5C6B5F';
const line = '#C8D8C8';
const bg = '#F4F8F4';

export const routeForRole: Record<Role, string> = {
  Farmer: '/farmer-dashboard',
  'MAO Personnel': '/mao-dashboard',
  'IT Expert': '/it-dashboard',
};

export const moduleRoutes = {
  dashboard: '/farmer-dashboard',
  farmers: '/farmer-profiles',
  climate: '/climate-records',
  prediction: '/weather-prediction',
  assistant: '/ai-assistant',
  production: '/rice-production',
  heatmap: '/heat-map',
  advisories: '/planting-advisories',
  announcements: '/announcements',
  community: '/community-feed',
  messages: '/messages',
  notifications: '/notifications',
  reports: '/reports',
  users: '/user-management',
  logs: '/system-logs',
  settings: '/profile-settings',
};

const alerts = [
  'High rainfall probability in coastal barangays within 48 hours.',
  'Monitor irrigated fields for stem borer and leaf folder activity.',
  'Rainfed farms should delay basal fertilizer until soil moisture stabilizes.',
];

export const climateSeries = [
  { label: 'Rain', value: 74, color: blue },
  { label: 'Temp', value: 31, color: '#F57C00' },
  { label: 'Humidity', value: 82, color: '#00897B' },
  { label: 'Wind', value: 18, color: '#7B1FA2' },
];

const modules: ModuleConfig[] = [
  {
    key: 'farmer-profiles',
    title: 'Farmer Profiles',
    subtitle: 'Create, update, review, and link farmer profiles to user accounts.',
    fields: ['Full name', 'Contact number', 'Address', 'Barangay', 'Farm area', 'Farm type', 'Linked user account'],
    filters: ['Barangay', 'Farm type', 'Account status'],
    access: ['MAO Personnel', 'IT Expert'],
    records: [
      { 'Full name': 'Juan Dela Cruz', Barangay: 'Balibago', 'Farm area': '1.50 ha', 'Farm type': 'Irrigated', 'Linked user account': 'juan@example.com' },
      { 'Full name': 'Maria Reyes', Barangay: 'Matabungkay', 'Farm area': '0.85 ha', 'Farm type': 'Rainfed', 'Linked user account': 'maria@example.com' },
    ],
  },
  {
    key: 'climate-records',
    title: 'Climate Records',
    subtitle: 'Daily weather observations from PAGASA or municipal monitoring.',
    fields: ['Record date', 'Rainfall', 'Temperature', 'Humidity', 'Wind speed', 'Season', 'Source'],
    filters: ['Date', 'Season', 'Source'],
    access: ['MAO Personnel', 'IT Expert'],
    records: [
      { 'Record date': '2026-07-01', Rainfall: '42 mm', Temperature: '30.8 C', Humidity: '84%', 'Wind speed': '16 kph', Season: 'Wet', Source: 'PAGASA' },
      { 'Record date': '2026-06-30', Rainfall: '18 mm', Temperature: '32.1 C', Humidity: '78%', 'Wind speed': '12 kph', Season: 'Wet', Source: 'PAGASA' },
    ],
  },
  {
    key: 'rice-production',
    title: 'Rice Production',
    subtitle: 'Yield records, farm area, season, production totals, and remarks.',
    fields: ['Barangay', 'Season', 'Irrigation type', 'Yield per hectare', 'Area in hectares', 'Total production', 'Year', 'Remarks'],
    filters: ['Barangay', 'Year', 'Season', 'Irrigation type'],
    access: ['MAO Personnel', 'IT Expert'],
    records: [
      { Barangay: 'Balibago', Season: 'Wet', 'Irrigation type': 'Irrigated', 'Yield per hectare': '4.6 t/ha', 'Area in hectares': '82', 'Total production': '377.2 t', Year: '2026' },
      { Barangay: 'Prenza', Season: 'Dry', 'Irrigation type': 'Rainfed', 'Yield per hectare': '3.3 t/ha', 'Area in hectares': '41', 'Total production': '135.3 t', Year: '2026' },
    ],
  },
  {
    key: 'heat-map',
    title: 'Heat Map Areas',
    subtitle: 'Barangay risk markers with rainfall, yield, advisory, and irrigation signals.',
    fields: ['Barangay', 'Latitude', 'Longitude', 'Risk level', 'Risk type', 'Risk score', 'Predicted yield', 'Rainfall status', 'Planting advisory', 'Irrigation recommendation', 'Description'],
    filters: ['Barangay', 'Risk level', 'Risk type'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { Barangay: 'Matabungkay', Latitude: '13.957', Longitude: '120.617', 'Risk level': 'High', 'Risk type': 'Flood', 'Risk score': '82', 'Predicted yield': '3.4 t/ha', 'Rainfall status': 'Above normal' },
      { Barangay: 'Binubusan', Latitude: '13.948', Longitude: '120.637', 'Risk level': 'Moderate', 'Risk type': 'Heat', 'Risk score': '55', 'Predicted yield': '4.1 t/ha', 'Rainfall status': 'Near normal' },
      { Barangay: 'Malaruhatan', Latitude: '13.993', Longitude: '120.681', 'Risk level': 'Severe', 'Risk type': 'Drought', 'Risk score': '91', 'Predicted yield': '2.9 t/ha', 'Rainfall status': 'Below normal' },
    ],
  },
  {
    key: 'advisories',
    title: 'Planting Advisories',
    subtitle: 'Draft, publish, and view barangay-specific advisories.',
    fields: ['Title', 'Content', 'Type', 'Target barangay', 'Posted by', 'Status'],
    filters: ['Type', 'Target barangay', 'Status'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { Title: 'Delay direct seeding in flood-prone areas', Type: 'Planting', 'Target barangay': 'Matabungkay', 'Posted by': 'MAO Office', Status: 'Published' },
      { Title: 'Maintain shallow irrigation during tillering', Type: 'Irrigation', 'Target barangay': 'All barangays', 'Posted by': 'MAO Office', Status: 'Published' },
    ],
  },
  {
    key: 'announcements',
    title: 'Announcements',
    subtitle: 'News, events, training schedules, and distribution programs.',
    fields: ['Title', 'Content', 'Category', 'Posted by', 'Status'],
    filters: ['Category', 'Status'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { Title: 'Certified seed distribution', Category: 'Seed Distribution', 'Posted by': 'MAO Office', Status: 'Published' },
      { Title: 'Climate-smart rice training', Category: 'Training', 'Posted by': 'MAO Office', Status: 'Published' },
    ],
  },
  {
    key: 'notifications',
    title: 'Notifications',
    subtitle: 'Warnings, advisories, announcements, and read status management.',
    fields: ['User', 'Title', 'Message', 'Type', 'Read/unread status'],
    filters: ['Type', 'Status'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { User: 'Juan Dela Cruz', Title: 'Flood watch', Type: 'Warning', 'Read/unread status': 'Unread' },
      { User: 'Maria Reyes', Title: 'New advisory', Type: 'Advisory', 'Read/unread status': 'Read' },
    ],
  },
  {
    key: 'community',
    title: 'Community Feed',
    subtitle: 'Agricultural updates with posts, comments, reactions, and attachments.',
    fields: ['Title', 'Body', 'Category', 'Visibility', 'Event date', 'Media files', 'Reactions', 'Comments'],
    filters: ['Category', 'Visibility', 'Event date'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { Title: 'Field demo photos', Category: 'Activity', Visibility: 'All Users', 'Event date': '2026-07-05', Reactions: '24 Helpful' },
      { Title: 'Training reminder', Category: 'Training', Visibility: 'All Farmers', 'Event date': '2026-07-09', Reactions: '17 Like' },
    ],
  },
  {
    key: 'messages',
    title: 'Messages',
    subtitle: 'One-to-one conversations with attachments and read timestamps.',
    fields: ['Participants', 'Message body', 'Attachment path/name/mime type', 'Read timestamp', 'Last message timestamp'],
    filters: ['Participant', 'Read status'],
    access: ['Farmer', 'MAO Personnel', 'IT Expert'],
    records: [
      { Participants: 'Juan Dela Cruz, MAO Office', 'Message body': 'Can I request seed assistance?', 'Read timestamp': 'Unread', 'Last message timestamp': 'Today 9:20 AM' },
      { Participants: 'Maria Reyes, MAO Office', 'Message body': 'Submitted farm profile update.', 'Read timestamp': 'Today 8:40 AM', 'Last message timestamp': 'Today 8:40 AM' },
    ],
  },
  {
    key: 'reports',
    title: 'Reports',
    subtitle: 'Generate, view, print, and export climate and production reports.',
    fields: ['Report type', 'Title', 'Generated by', 'Payload/data', 'Date generated'],
    filters: ['Report type', 'Date generated'],
    access: ['MAO Personnel', 'IT Expert'],
    records: [
      { 'Report type': 'Rice Production', Title: 'Q2 Barangay Yield Summary', 'Generated by': 'MAO Office', 'Date generated': '2026-07-01' },
      { 'Report type': 'Climate Risk', Title: 'Wet Season Risk Snapshot', 'Generated by': 'Admin', 'Date generated': '2026-06-28' },
    ],
  },
  {
    key: 'users',
    title: 'User Management',
    subtitle: 'Create users, assign roles, and manage active or inactive status.',
    fields: ['Name', 'Email', 'Password', 'Role', 'Contact number', 'Address', 'Barangay', 'Status'],
    filters: ['Role', 'Barangay', 'Status'],
    access: ['IT Expert'],
    records: [
      { Name: 'Juan Dela Cruz', Email: 'juan@example.com', Role: 'Farmer', Barangay: 'Balibago', Status: 'Active' },
      { Name: 'Ana Santos', Email: 'ana.mao@example.gov.ph', Role: 'MAO Personnel', Barangay: 'Poblacion', Status: 'Active' },
      { Name: 'System Admin', Email: 'admin@example.gov.ph', Role: 'IT Expert', Barangay: 'Poblacion', Status: 'Active' },
    ],
  },
  {
    key: 'logs',
    title: 'System Logs',
    subtitle: 'Audit module actions by user, action, module, and date.',
    fields: ['User', 'Action', 'Module', 'Date', 'Details'],
    filters: ['User', 'Action', 'Module', 'Date'],
    access: ['IT Expert'],
    records: [
      { User: 'Ana Santos', Action: 'Published advisory', Module: 'Planting Advisories', Date: '2026-07-01', Details: 'Target: all barangays' },
      { User: 'System Admin', Action: 'Activated account', Module: 'User Management', Date: '2026-06-30', Details: 'User: maria@example.com' },
    ],
  },
];

export function getModule(key: ModuleKey) {
  return modules.find((item) => item.key === key)!;
}

export function Screen({ children }: { children: ReactNode }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

export function Hero({ title, text, tag }: { title: string; text: string; tag?: string }) {
  return (
    <View style={styles.hero}>
      {tag ? <Text style={styles.heroTag}>{tag}</Text> : null}
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroText}>{text}</Text>
    </View>
  );
}

export function Section({ title, children, action }: { title: string; children: ReactNode; action?: string }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
      </View>
      {children}
    </View>
  );
}

export function StatGrid({ items }: { items: { label: string; value: string; color?: string }[] }) {
  return (
    <View style={styles.statGrid}>
      {items.map((item) => (
        <View key={item.label} style={[styles.statCard, { borderLeftColor: item.color ?? green }]}>
          <Text style={[styles.statValue, { color: item.color ?? green }]}>{item.value}</Text>
          <Text style={styles.statLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

export function ActionGrid({ items }: { items: { title: string; route: string; note?: string; admin?: boolean }[] }) {
  return (
    <View style={styles.actionGrid}>
      {items.map((item) => (
        <TouchableOpacity key={item.title} style={styles.actionCard} onPress={() => router.push(item.route as never)}>
          <Text style={styles.actionTitle}>{item.title}</Text>
          <Text style={styles.actionText}>{item.note ?? 'Open module'}</Text>
          {item.admin ? <Text style={styles.pill}>Restricted</Text> : null}
        </TouchableOpacity>
      ))}
    </View>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value || 'Ready for API data'}</Text>
    </View>
  );
}

function FilterChips({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0] ?? 'All');
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
      {items.map((item) => {
        const selected = item === active;
        return (
          <TouchableOpacity key={item} style={[styles.chip, selected && styles.chipSelected]} onPress={() => setActive(item)}>
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export function DashboardScreen({ role }: { role: Role }) {
  const isFarmer = role === 'Farmer';
  const isAdmin = role === 'IT Expert';
  const stats = isFarmer
    ? [
        { label: 'Unread notifications', value: '3', color: blue },
        { label: 'Current barangay risk', value: 'High', color: '#D84315' },
        { label: 'Latest rainfall', value: '42 mm', color: blue },
        { label: 'Advisories', value: '12', color: green },
      ]
    : isAdmin
      ? [
          { label: 'Total users', value: '1,312', color: green },
          { label: 'Active users', value: '1,244', color: blue },
          { label: 'Inactive users', value: '68', color: '#D84315' },
          { label: 'System logs', value: '4,902', color: '#7B1FA2' },
        ]
      : [
          { label: 'Total farmers', value: '1,284', color: green },
          { label: 'Climate records', value: '732', color: blue },
          { label: 'Rice records', value: '418', color: '#00897B' },
          { label: 'Reports', value: '45', color: '#7B1FA2' },
          { label: 'Farm area total', value: '1,972 ha', color: green },
          { label: 'Production total', value: '8,842 t', color: blue },
        ];

  const links = isFarmer
    ? [
        { title: 'Weather Prediction', route: moduleRoutes.prediction, note: 'Forecast crop impact' },
        { title: 'AI Farming Assistant', route: moduleRoutes.assistant, note: 'Ask farm questions' },
        { title: 'Planting Advisories', route: moduleRoutes.advisories, note: 'Published guidance' },
        { title: 'Community Feed', route: moduleRoutes.community, note: 'Updates and comments' },
        { title: 'Messages', route: moduleRoutes.messages, note: 'Contact MAO' },
        { title: 'Heat Map Areas', route: moduleRoutes.heatmap, note: 'Barangay risks' },
      ]
    : isAdmin
      ? [
          { title: 'User Management', route: moduleRoutes.users, admin: true },
          { title: 'System Logs', route: moduleRoutes.logs, admin: true },
          { title: 'Reports', route: moduleRoutes.reports },
          { title: 'Farmer Profiles', route: moduleRoutes.farmers },
          { title: 'Announcements', route: moduleRoutes.announcements },
          { title: 'Settings', route: moduleRoutes.settings },
        ]
      : [
          { title: 'Farmer Profiles', route: moduleRoutes.farmers },
          { title: 'Climate Records', route: moduleRoutes.climate },
          { title: 'Rice Production', route: moduleRoutes.production },
          { title: 'Reports', route: moduleRoutes.reports },
          { title: 'Heat Map Areas', route: moduleRoutes.heatmap },
          { title: 'Messages', route: moduleRoutes.messages },
        ];

  return (
    <Screen>
      <Hero
        tag={role}
        title={isFarmer ? 'Good morning, Juan' : isAdmin ? 'System Administration' : 'Municipal Agriculture Monitoring'}
        text={
          isFarmer
            ? 'Your advisories, weather risks, AI help, community updates, and messages are one tap away.'
            : isAdmin
              ? 'Manage accounts, status, reports, logs, and module health for iClimate.'
              : 'Monitor climate, rice production, advisories, announcements, risk areas, and field reports.'
        }
      />
      <StatGrid items={stats} />
      {isAdmin ? <RoleCounts /> : null}
      <Section title="Quick Access">
        <ActionGrid items={links} />
      </Section>
      <Section title={isFarmer ? 'Latest Farm Alerts' : 'Latest Climate Data'}>
        {alerts.map((item) => (
          <Text key={item} style={styles.bullet}>- {item}</Text>
        ))}
      </Section>
      {!isAdmin ? <WeatherChart /> : <LatestLogs />}
      {!isFarmer && !isAdmin ? <RiskSummary /> : null}
      <BottomNav role={role} />
    </Screen>
  );
}

function RoleCounts() {
  return (
    <Section title="Role Counts">
      <View style={styles.inlineStats}>
        {['Farmers 1,284', 'MAO Personnel 21', 'IT Experts 7'].map((item) => (
          <Text key={item} style={styles.inlineStat}>{item}</Text>
        ))}
      </View>
    </Section>
  );
}

function WeatherChart() {
  return (
    <Section title="Weather Chart" action="Stored source: PAGASA">
      {climateSeries.map((item) => (
        <View key={item.label} style={styles.barRow}>
          <Text style={styles.barLabel}>{item.label}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${Math.min(item.value, 100)}%`, backgroundColor: item.color }]} />
          </View>
          <Text style={styles.barValue}>{item.value}</Text>
        </View>
      ))}
    </Section>
  );
}

function RiskSummary() {
  return (
    <Section title="Risk Level Summary">
      <View style={styles.riskRow}>
        {[
          ['Low', '#2E7D32'],
          ['Moderate', '#F9A825'],
          ['High', '#EF6C00'],
          ['Severe', '#C62828'],
        ].map(([label, color]) => (
          <View key={label} style={[styles.riskBox, { borderColor: color }]}>
            <Text style={[styles.riskLabel, { color }]}>{label}</Text>
            <Text style={styles.riskCount}>{label === 'Severe' ? '3' : label === 'High' ? '8' : '12'}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

function LatestLogs() {
  return (
    <Section title="Latest Users and Logs">
      {getModule('logs').records.map((item) => (
        <Field key={item.Details} label={`${item.Module} - ${item.Action}`} value={`${item.User}, ${item.Date}`} />
      ))}
    </Section>
  );
}

export function ModuleScreen({ moduleKey, role }: { moduleKey: ModuleKey; role: Role }) {
  const config = getModule(moduleKey);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [listMode, setListMode] = useState<'list' | 'map'>('list');
  const canEdit = role !== 'Farmer' || ['community', 'messages', 'notifications'].includes(config.key);

  const records = useMemo(
    () =>
      config.records.filter((record) =>
        Object.values(record).join(' ').toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [config.records, query],
  );

  const refresh = () => {
    setIsLoading(true);
    setShowError(false);
    setTimeout(() => setIsLoading(false), 550);
  };

  return (
    <Screen>
      <Hero tag={role} title={config.title} text={config.subtitle} />
      <Section title="Tools">
        <View style={styles.toolbar}>
          <TouchableOpacity style={styles.smallButton} onPress={refresh}>
            <Text style={styles.smallButtonText}>Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButtonAlt} onPress={() => setShowError(!showError)}>
            <Text style={styles.smallButtonAltText}>Error State</Text>
          </TouchableOpacity>
          {canEdit ? (
            <TouchableOpacity style={styles.smallButton} onPress={() => setShowForm(true)}>
              <Text style={styles.smallButtonText}>{config.key === 'reports' ? 'Generate' : 'Create'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Search records"
          placeholderTextColor="#66756A"
        />
        <FilterChips items={['All', ...(config.filters ?? [])]} />
        {config.key === 'heat-map' ? (
          <View style={styles.segment}>
            {(['list', 'map'] as const).map((mode) => (
              <TouchableOpacity key={mode} style={[styles.segmentButton, listMode === mode && styles.segmentButtonActive]} onPress={() => setListMode(mode)}>
                <Text style={[styles.segmentText, listMode === mode && styles.segmentTextActive]}>{mode === 'list' ? 'List View' : 'Map View'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}
      </Section>

      {isLoading ? <StateCard title="Loading records" text="Fetching the latest mobile-ready data from the API layer." /> : null}
      {showError ? <StateCard title="Unable to sync" text="The offline-friendly UI keeps local records visible until the Laravel API responds." danger /> : null}
      {!isLoading && records.length === 0 ? <StateCard title="No records found" text="Try another search term or clear the filters." /> : null}

      {config.key === 'heat-map' && listMode === 'map' ? <RiskMap records={records} /> : null}
      {listMode === 'list' || config.key !== 'heat-map' ? (
        <Section title={config.key === 'reports' ? 'Report List' : 'Records'}>
          {records.map((record, index) => (
            <View key={`${config.key}-${index}`} style={styles.recordCard}>
              {Object.entries(record).map(([label, value]) => (
                <Field key={label} label={label} value={value} />
              ))}
              <View style={styles.recordActions}>
                <TouchableOpacity style={styles.recordButton} onPress={() => Alert.alert(config.title, 'Record details are ready for API-backed view screens.')}>
                  <Text style={styles.recordButtonText}>View</Text>
                </TouchableOpacity>
                {canEdit ? (
                  <>
                    <TouchableOpacity style={styles.recordButton} onPress={() => setShowForm(true)}>
                      <Text style={styles.recordButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => Alert.alert('Confirm delete', 'This action will ask the API to delete the selected record.')}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </>
                ) : null}
                {config.key === 'reports' ? (
                  <TouchableOpacity style={styles.recordButton} onPress={() => Alert.alert('Export CSV', 'CSV export endpoint placeholder is ready.')}>
                    <Text style={styles.recordButtonText}>CSV</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ))}
        </Section>
      ) : null}

      <FormModal visible={showForm} title={config.title} fields={config.fields} onClose={() => setShowForm(false)} />
      <BottomNav role={role} />
    </Screen>
  );
}

function RiskMap({ records }: { records: Record<string, string>[] }) {
  return (
    <Section title="Barangay Risk Map">
      <View style={styles.mapBox}>
        {records.map((record, index) => {
          const severity = record['Risk level'];
          const color = severity === 'Severe' ? '#C62828' : severity === 'High' ? '#EF6C00' : severity === 'Moderate' ? '#F9A825' : green;
          return (
            <View key={record.Barangay} style={[styles.mapMarker, { left: `${18 + index * 25}%`, top: `${22 + index * 17}%`, backgroundColor: color }]}>
              <Text style={styles.mapMarkerText}>{record.Barangay.slice(0, 3)}</Text>
            </View>
          );
        })}
        <Text style={styles.mapCaption}>Lian barangay risk markers with level, score, type, yield, and rainfall status.</Text>
      </View>
    </Section>
  );
}

function StateCard({ title, text, danger }: { title: string; text: string; danger?: boolean }) {
  return (
    <View style={[styles.stateCard, danger && styles.stateDanger]}>
      <Text style={[styles.stateTitle, danger && styles.stateDangerText]}>{title}</Text>
      <Text style={styles.stateText}>{text}</Text>
    </View>
  );
}

function FormModal({ visible, title, fields, onClose }: { visible: boolean; title: string; fields: string[]; onClose: () => void }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalShade}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <ScrollView style={styles.modalScroll}>
            {fields.map((field) => (
              <View key={field} style={styles.modalField}>
                <Text style={styles.fieldLabel}>{field}</Text>
                <TextInput style={styles.input} placeholder={field} placeholderTextColor="#66756A" />
              </View>
            ))}
          </ScrollView>
          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.smallButtonAlt} onPress={onClose}>
              <Text style={styles.smallButtonAltText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton} onPress={onClose}>
              <Text style={styles.smallButtonText}>Save Draft</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export function PredictionScreen() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const fields = ['Rainfall', 'Temperature', 'Humidity', 'Wind speed', 'Season', 'Barangay', 'Irrigation type'];

  const predict = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult('Moderate flood risk, predicted rice yield 3.8 t/ha, confidence 86%. Improve drainage and delay planting by 3-5 days in low-lying fields.');
    }, 650);
  };

  return (
    <Screen>
      <Hero title="Weather Prediction" tag="ML Ready" text="Enter climate observations to preview weather impact, rice yield, and farming recommendations." />
      <Section title="Prediction Form">
        {fields.map((field) => (
          <View key={field} style={styles.modalField}>
            <Text style={styles.fieldLabel}>{field}</Text>
            <TextInput style={styles.input} placeholder={field} placeholderTextColor="#66756A" />
          </View>
        ))}
        <TouchableOpacity style={styles.primaryButton} onPress={predict}>
          <Text style={styles.primaryButtonText}>{loading ? 'Predicting...' : 'Run Prediction'}</Text>
        </TouchableOpacity>
      </Section>
      {result ? <StateCard title="Prediction Result" text={result} /> : <StateCard title="No prediction yet" text="Results, explanation, warnings, and recommendations will appear here." />}
      <BottomNav role="Farmer" />
    </Screen>
  );
}

export function AssistantScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { who: 'AI Assistant', text: 'Ask about weather, irrigation, rice yield, pests, planting windows, or advisories.' },
  ]);

  const send = () => {
    if (!message.trim()) return;
    setMessages((items) => [
      ...items,
      { who: 'You', text: message.trim() },
      {
        who: 'AI Assistant',
        text: 'Recommendation: keep field water at 2-3 cm, monitor rainfall, and follow the latest barangay advisory. Confidence: 84%.',
      },
    ]);
    setMessage('');
  };

  return (
    <Screen>
      <Hero title="AI Farming Assistant" tag="Chat" text="A farming, weather, irrigation, rice yield, and planting assistant with per-user history." />
      <Section title="Chat History" action="Clear ready">
        {messages.map((item, index) => (
          <View key={`${item.who}-${index}`} style={[styles.chatBubble, item.who === 'You' && styles.chatBubbleMine]}>
            <Text style={styles.chatName}>{item.who}</Text>
            <Text style={styles.chatText}>{item.text}</Text>
          </View>
        ))}
      </Section>
      <Section title="Ask a Question">
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          multiline
          placeholder="Ask about planting, weather, irrigation, or yield..."
          placeholderTextColor="#66756A"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={send}>
          <Text style={styles.primaryButtonText}>Send</Text>
        </TouchableOpacity>
      </Section>
      <BottomNav role="Farmer" />
    </Screen>
  );
}

export function SettingsScreen() {
  return (
    <Screen>
      <Hero title="Profile and Settings" text="Edit profile details, contact information, password, email verification, and account preferences." />
      <Section title="Profile Editing">
        {['Name', 'Email', 'Contact number', 'Address', 'Barangay', 'Password'].map((field) => (
          <View key={field} style={styles.modalField}>
            <Text style={styles.fieldLabel}>{field}</Text>
            <TextInput style={styles.input} placeholder={field} placeholderTextColor="#66756A" />
          </View>
        ))}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </Section>
      <Section title="Account Status">
        <Field label="Email verification" value="Pending verification link support" />
        <Field label="Account status" value="Active / inactive ready" />
        <Field label="Push notifications" value="Ready for warnings, advisories, and announcements" />
      </Section>
    </Screen>
  );
}

export function AuthInfoScreen({ mode }: { mode: 'forgot' | 'verify' }) {
  return (
    <Screen>
      <Hero
        title={mode === 'forgot' ? 'Forgot Password' : 'Email Verification'}
        text={mode === 'forgot' ? 'Request a password reset link through the Laravel API.' : 'Verify user email before account access is fully enabled.'}
      />
      <Section title={mode === 'forgot' ? 'Reset Link' : 'Verification'}>
        <TextInput style={styles.input} placeholder="Email address" placeholderTextColor="#66756A" autoCapitalize="none" />
        <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('API ready', 'This screen is ready for the Laravel authentication endpoint.')}>
          <Text style={styles.primaryButtonText}>{mode === 'forgot' ? 'Send Reset Link' : 'Resend Verification Email'}</Text>
        </TouchableOpacity>
      </Section>
    </Screen>
  );
}

function BottomNav({ role }: { role: Role }) {
  const items = role === 'IT Expert'
    ? [
        ['Dashboard', routeForRole[role]],
        ['Users', moduleRoutes.users],
        ['Reports', moduleRoutes.reports],
        ['Settings', moduleRoutes.settings],
      ]
    : role === 'MAO Personnel'
      ? [
          ['Dashboard', routeForRole[role]],
          ['Climate', moduleRoutes.climate],
          ['Reports', moduleRoutes.reports],
          ['Messages', moduleRoutes.messages],
        ]
      : [
          ['Dashboard', routeForRole[role]],
          ['Advisories', moduleRoutes.advisories],
          ['Assistant', moduleRoutes.assistant],
          ['Profile', moduleRoutes.settings],
        ];
  return (
    <View style={styles.bottomNav}>
      {items.map(([label, route]) => (
        <TouchableOpacity key={label} style={styles.bottomItem} onPress={() => router.push(route as never)}>
          <Text style={styles.bottomText}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: bg },
  content: { padding: 18, paddingBottom: 36 },
  hero: { backgroundColor: green, borderRadius: 8, padding: 18, marginBottom: 14 },
  heroTag: { color: '#DDEEDD', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', marginBottom: 6 },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', lineHeight: 30, marginBottom: 8 },
  heroText: { color: '#FFFFFF', fontSize: 15, lineHeight: 22 },
  section: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginTop: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 12 },
  sectionTitle: { color: green, fontSize: 18, fontWeight: '800', flex: 1 },
  sectionAction: { color: blue, fontSize: 12, fontWeight: '800' },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: { width: '47%', minHeight: 96, backgroundColor: '#FFFFFF', borderRadius: 8, borderLeftWidth: 5, padding: 14, justifyContent: 'center' },
  statValue: { fontSize: 25, fontWeight: '800', marginBottom: 4 },
  statLabel: { color: ink, fontSize: 13, fontWeight: '700', lineHeight: 18 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionCard: { width: '47%', minHeight: 110, borderColor: line, borderWidth: 1, borderRadius: 8, padding: 12, justifyContent: 'space-between' },
  actionTitle: { color: blue, fontSize: 15, fontWeight: '800', lineHeight: 20 },
  actionText: { color: muted, fontSize: 12, fontWeight: '700', marginTop: 8 },
  pill: { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: '#EAF3EA', color: green, fontSize: 11, fontWeight: '800' },
  bullet: { color: ink, fontSize: 15, lineHeight: 22, marginBottom: 8 },
  fieldRow: { borderBottomColor: '#E6EEE6', borderBottomWidth: 1, paddingVertical: 8 },
  fieldLabel: { color: ink, fontSize: 13, fontWeight: '800', marginBottom: 4 },
  fieldValue: { color: muted, fontSize: 14, lineHeight: 20 },
  inlineStats: { gap: 8 },
  inlineStat: { color: ink, fontSize: 15, fontWeight: '700' },
  barRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  barLabel: { color: ink, width: 62, fontSize: 13, fontWeight: '800' },
  barTrack: { flex: 1, height: 12, borderRadius: 8, backgroundColor: '#EAF3EA', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 8 },
  barValue: { color: ink, width: 32, textAlign: 'right', fontSize: 13, fontWeight: '800' },
  riskRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  riskBox: { width: '47%', borderWidth: 1, borderRadius: 8, padding: 12 },
  riskLabel: { fontSize: 14, fontWeight: '800' },
  riskCount: { color: ink, fontSize: 22, fontWeight: '800', marginTop: 4 },
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  input: { borderColor: line, borderWidth: 1, borderRadius: 8, color: ink, backgroundColor: '#FFFFFF', fontSize: 15, paddingHorizontal: 12, paddingVertical: 11 },
  chips: { gap: 8, paddingVertical: 12 },
  chip: { borderColor: line, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9 },
  chipSelected: { backgroundColor: green, borderColor: green },
  chipText: { color: ink, fontSize: 13, fontWeight: '800' },
  chipTextSelected: { color: '#FFFFFF' },
  smallButton: { backgroundColor: green, borderRadius: 8, paddingHorizontal: 13, paddingVertical: 11 },
  smallButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  smallButtonAlt: { borderColor: line, borderWidth: 1, borderRadius: 8, paddingHorizontal: 13, paddingVertical: 11, backgroundColor: '#FFFFFF' },
  smallButtonAltText: { color: green, fontSize: 13, fontWeight: '800' },
  segment: { flexDirection: 'row', borderColor: line, borderWidth: 1, borderRadius: 8, overflow: 'hidden' },
  segmentButton: { flex: 1, paddingVertical: 11, alignItems: 'center' },
  segmentButtonActive: { backgroundColor: green },
  segmentText: { color: ink, fontSize: 13, fontWeight: '800' },
  segmentTextActive: { color: '#FFFFFF' },
  stateCard: { backgroundColor: '#FFFFFF', borderRadius: 8, padding: 16, marginTop: 14, borderLeftColor: blue, borderLeftWidth: 5 },
  stateDanger: { borderLeftColor: '#C62828' },
  stateTitle: { color: green, fontSize: 17, fontWeight: '800', marginBottom: 4 },
  stateDangerText: { color: '#C62828' },
  stateText: { color: ink, fontSize: 14, lineHeight: 21 },
  recordCard: { borderColor: line, borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 12 },
  recordActions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 },
  recordButton: { backgroundColor: '#EAF3EA', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9 },
  recordButtonText: { color: green, fontSize: 12, fontWeight: '800' },
  deleteButton: { backgroundColor: '#FDECEC', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 9 },
  deleteButtonText: { color: '#C62828', fontSize: 12, fontWeight: '800' },
  mapBox: { minHeight: 280, borderRadius: 8, backgroundColor: '#E1F0E1', overflow: 'hidden', borderColor: line, borderWidth: 1 },
  mapMarker: { position: 'absolute', width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', borderColor: '#FFFFFF', borderWidth: 3 },
  mapMarkerText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  mapCaption: { position: 'absolute', left: 12, right: 12, bottom: 12, color: ink, fontSize: 13, fontWeight: '700', backgroundColor: 'rgba(255,255,255,0.88)', borderRadius: 8, padding: 10 },
  modalShade: { flex: 1, backgroundColor: 'rgba(0,0,0,0.38)', justifyContent: 'flex-end' },
  modalCard: { maxHeight: '86%', backgroundColor: '#FFFFFF', borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: 18 },
  modalTitle: { color: green, fontSize: 22, fontWeight: '800', marginBottom: 12 },
  modalScroll: { maxHeight: 520 },
  modalField: { marginBottom: 12 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 12 },
  primaryButton: { backgroundColor: green, borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  chatBubble: { backgroundColor: '#EAF3EA', borderRadius: 8, padding: 12, marginBottom: 10 },
  chatBubbleMine: { backgroundColor: '#E8F1FB' },
  chatName: { color: green, fontSize: 12, fontWeight: '800', marginBottom: 4 },
  chatText: { color: ink, fontSize: 14, lineHeight: 21 },
  messageInput: { minHeight: 92, textAlignVertical: 'top' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#FFFFFF', borderColor: line, borderWidth: 1, borderRadius: 8, marginTop: 18, overflow: 'hidden' },
  bottomItem: { flex: 1, minHeight: 54, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  bottomText: { color: green, fontSize: 11, fontWeight: '800', textAlign: 'center' },
});
