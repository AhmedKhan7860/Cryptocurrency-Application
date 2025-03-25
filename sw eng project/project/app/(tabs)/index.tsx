import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowDownLeft, ArrowUpRight, RefreshCw, QrCode, Gift, Bell } from 'lucide-react-native';

const cryptoData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 101810.47,
    change: '+5.36%',
    imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3462.64,
    change: '-0.25%',
    imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 194.29,
    change: '-0.07%',
    imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.33702,
    change: '+6.00%',
    imageUrl: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 2.3312,
    change: '+1.57%',
    imageUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
  },
];

export default function ExchangeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuDots}>⋮⋮</Text>
          </TouchableOpacity>
          <View style={styles.headerTabs}>
            <TouchableOpacity style={styles.headerTabActive}>
              <Text style={styles.headerTabTextActive}>Exchange</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerTab}>
              <Text style={styles.headerTabText}>Web3</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Gift size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={20} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop' }}
            style={styles.profileImage}
          />
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <TouchableOpacity>
            <Text style={styles.eyeIcon}>👁️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>$169,421.73</Text>
        <View style={styles.profitContainer}>
          <Text style={styles.profitAmount}>+$26,364.12</Text>
          <Text style={styles.profitPercentage}>(+25.10%)</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonIcon}>
            <ArrowUpRight color="#fff" size={24} />
          </View>
          <Text style={styles.actionButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonIcon}>
            <ArrowDownLeft color="#fff" size={24} />
          </View>
          <Text style={styles.actionButtonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonIcon}>
            <QrCode color="#fff" size={24} />
          </View>
          <Text style={styles.actionButtonText}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionButtonIcon}>
            <RefreshCw color="#fff" size={24} />
          </View>
          <Text style={styles.actionButtonText}>Convert</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>★ Favorites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <TouchableOpacity style={[styles.categoryButton, styles.categoryButtonActive]}>
            <Text style={styles.categoryButtonTextActive}>⭐ Top</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>🎮 Gamers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryButtonText}>🆕 New</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.cryptoList}>
        {cryptoData.map((crypto) => (
          <TouchableOpacity key={crypto.symbol} style={styles.cryptoItem}>
            <View style={styles.cryptoInfo}>
              <Image source={{ uri: crypto.imageUrl }} style={styles.cryptoIcon} />
              <View>
                <Text style={styles.cryptoName}>{crypto.name}</Text>
                <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
              </View>
            </View>
            <View style={styles.cryptoPriceContainer}>
              <Text style={styles.cryptoPrice}>${crypto.price.toLocaleString()}</Text>
              <Text style={[
                styles.cryptoChange,
                { color: crypto.change.includes('+') ? '#4CAF50' : '#FF5252' }
              ]}>
                {crypto.change}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 12,
  },
  menuDots: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTabs: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 4,
  },
  headerTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  headerTabActive: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#8b5cf6',
  },
  headerTabText: {
    color: '#666666',
    fontSize: 14,
  },
  headerTabTextActive: {
    color: '#ffffff',
    fontSize: 14,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  balanceContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  eyeIcon: {
    fontSize: 16,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  profitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profitAmount: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 4,
  },
  profitPercentage: {
    fontSize: 14,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 12,
  },
  listHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#333333',
  },
  categoryButtonActive: {
    backgroundColor: '#ffffff',
  },
  categoryButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: '#000000',
    fontSize: 14,
  },
  cryptoList: {
    flex: 1,
  },
  cryptoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cryptoIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  cryptoName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  cryptoSymbol: {
    fontSize: 14,
    color: '#666666',
  },
  cryptoPriceContainer: {
    alignItems: 'flex-end',
  },
  cryptoPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 4,
  },
  cryptoChange: {
    fontSize: 14,
  },
});