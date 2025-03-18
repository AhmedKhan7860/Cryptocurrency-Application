import { View, Text, StyleSheet, Image, Pressable, Switch } from 'react-native';
import { ChevronRight, ArrowLeftRight, Globe as Globe2, CircleHelp as HelpCircle, Bell, Eye, Moon, Shield, KeyRound, Lock, ScanEye, LogIn, GlobeLock } from 'lucide-react-native';
import {ScrollView} from 'react-native'
type SettingItemProps = {
  icon: React.ReactNode;
  label: string;
  value?: string;
  showChevron?: boolean;
  showSwitch?: boolean;
  onPress?: () => void;
};

function SettingItem({ icon, label, value, showChevron = true, showSwitch = false, onPress }: SettingItemProps) {
  return (
    <Pressable style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIcon}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <View style={styles.settingValue}>
        {value && <Text style={styles.valueText}>{value}</Text>}
        {showSwitch && <Switch 
          trackColor={{ false: '#333333', true: '#7C3AED' }}
          thumbColor={true ? '#FFFFFF' : '#FFFFFF'}
          value={false}
        />}
        {showChevron && <ChevronRight size={20} color="#666666" />}
      </View>
    </Pressable>
  );
}

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Account</Text>
      </View>

      <Pressable style={styles.profileSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=80' }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Luna Lindan</Text>
          <Text style={styles.profileEmail}>lunalindan@real.com</Text>
        </View>
        <ChevronRight size={20} color="#666666" />
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <SettingItem
          icon={<ArrowLeftRight size={20} color="#151415" />}
          label="Currency"
          value="USD"
        />
        <SettingItem
          icon={<Globe2 size={20} color="#151415" />}
          label="Language"
          value="English"
        />
        <SettingItem
          icon={<HelpCircle size={20} color="#151415" />}
          label="Support"
        />
        <SettingItem
          icon={<Bell size={20} color="#151415" />}
          label="Notifications"
          value="On"
        />
        <SettingItem
          icon={<Eye size={20} color="#151415" />}
          label="Hide balances"
          showSwitch={true}
          showChevron={false}
        />
        <SettingItem
          icon={<Moon size={20} color="#151415" />}
          label="Theme"
          value="Automatic"
        />
       
      </View>
      <View style={styles.section}>
      <Text style={styles.sectionTitle}>Security</Text>
        <SettingItem
            icon={<GlobeLock size={20} color="#151415" />}
            label = "Privacy & security"
        />
        <SettingItem
            icon={<KeyRound size={20} color="#151415" />}
            label="Two-Factor Authentication"
            value="Off"
            onPress={() => console.log('Navigate to 2FA settings')}
        />
        <SettingItem
            icon={<Lock size={20} color="#151415" />}
            label="Change Password"
            onPress={() => console.log('Navigate to Change Password screen')}
        />
        <SettingItem
            icon={<ScanEye size={20} color="#151415" />}
            label="Biometric Authentication"
            showSwitch={true}
            showChevron={false}
        />
        
        <SettingItem
            icon={<LogIn size={20} color="#151415" />}
            label="Login Activity"
            onPress={() => console.log('Navigate to Login Activity')}
        />
        <SettingItem
            icon={<Shield size={20} color="#151415" />}
            label="Security Alerts"
            showSwitch={true}
            showChevron={false}
        />
      </View>
    
      

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262429',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2d2f',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileEmail: {
    fontSize: 14,
    color: '#ded9e5',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2d2f',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#b080e9',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    
  },
  valueText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});