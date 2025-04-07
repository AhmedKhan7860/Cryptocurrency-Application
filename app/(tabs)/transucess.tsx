// TransactionSuccessScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Colors} from '@/constants/Colors';




type TransactionDetailsProps = {
  fromAmount: string;
  fromCurrency: string;
  toAmount: string;
  toCurrency: string;
  rate: string;
  fee: string;
};

const SuccessIcon = () => (
  <View style={styles.successIconWrapper}>
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        <Icon name="check" size={24} color="black" />
      </View>
    </View>
  </View>
);

const CryptoIcon = ({ type }: { type: 'btc' | 'usdt' | 'exchange' }) => {
  const bgColor =
    type === 'btc' ? '#f7931a' :
    type === 'usdt' ? '#26a17b' :
    '#4b5563'; // gray for exchange

  const symbol =
    type === 'btc' ? '₿' :
    type === 'usdt' ? '₮' : null;

  return (
    <View style={[styles.cryptoIcon, { backgroundColor: bgColor }]}>
      {symbol ? (
        <Text style={styles.cryptoText}>{symbol}</Text>
      ) : (
        <Icon name="shuffle" size={16} color="white" />
      )}
    </View>
  );
};

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  fromAmount,
  fromCurrency,
  toAmount,
  toCurrency,
  rate,
  fee,
}) => (
  <View style={styles.card}>
    <View style={styles.exchangeRow}>
      <View style={styles.currencyColumn}>
        <CryptoIcon type="usdt" />
        <Text style={styles.currencyText}>{`${fromCurrency} ${fromAmount}`}</Text>
      </View>

      <CryptoIcon type="exchange" />

      <View style={styles.currencyColumn}>
        <CryptoIcon type="btc" />
        <Text style={styles.currencyText}>{`${toCurrency} ${toAmount}`}</Text>
      </View>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.label}>Rate</Text>
      <Text style={styles.value}>{rate}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.label}>Fee</Text>
      <Text style={styles.value}>{fee}</Text>
    </View>

    <View style={styles.detailRow}>
      <Text style={styles.label}>You Receive</Text>
      <Text style={styles.value}>{`${toAmount} ${toCurrency}`}</Text>
    </View>
  </View>
);

const MobileStatusBar = () => (
  <View style={styles.statusBar}>
    <Text style={styles.statusTime}>9:14</Text>
    <View style={styles.statusIcons}>
      <Icon name="wifi" size={14} color="white" />
      <Icon name="bar-chart" size={14} color="white" />
      <Icon name="battery" size={14} color="white" />
    </View>
  </View>
);

const TransactionSuccess = () => {
  const theme = useColorScheme();
  const colors = Colors[theme ?? 'light'] || Colors.light;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <MobileStatusBar />
    <View style={styles.content}>
      <SuccessIcon />
      <Text style={[styles.title, {color: colors.text}]}>Transaction success</Text>
      <TransactionDetails
        fromAmount="1,000"
        fromCurrency="USDT"
        toAmount="0.01061533"
        toCurrency="BTC"
        rate="1 BTC = 100,035.0769 USDT"
        fee="Free"
      />
      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={[styles.buttonText, {color: colors.text}]}>View Transactions</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.homeIndicator} />
  </SafeAreaView>
  );
};

export default TransactionSuccess;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f172a', // crypto-dark
      paddingHorizontal: 16,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      paddingTop: 20,
    },
    statusBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#0f172a',
    },
    statusTime: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    statusIcons: {
      flexDirection: 'row',
      gap: 8,
    },
    successIconWrapper: {
      alignItems: 'center',
    },
    outerCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: '#334155',
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#00ff99',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
    },
    card: {
      width: '100%',
      backgroundColor: '#1e293b',
      borderRadius: 20,
      padding: 20,
      gap: 16,
    },
    exchangeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currencyColumn: {
      alignItems: 'center',
    },
    cryptoIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    cryptoText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '700',
    },
    currencyText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '500',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: '#334155',
      paddingTop: 8,
    },
    label: {
      color: '#94a3b8',
      fontSize: 14,
    },
    value: {
      color: 'white',
      fontSize: 14,
    },
    primaryButton: {
      backgroundColor: '#7c3aed',
      width: '100%',
      paddingVertical: 16,
      borderRadius: 999,
      alignItems: 'center',
      marginTop: 16,
    },
    secondaryButton: {
      borderWidth: 1,
      borderColor: '#475569',
      paddingVertical: 16,
      borderRadius: 999,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
    },
    homeIndicator: {
      height: 4,
      width: 128,
      backgroundColor: '#475569',
      borderRadius: 999,
      alignSelf: 'center',
      marginBottom: 16,
    },
  });
  