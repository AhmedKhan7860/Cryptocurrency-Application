import {  View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ConvertScreen(){
  const [usdtAmount, setUsdtAmount] = useState('1,000');
  const [btcAmount, setBtcAmount] = useState('0.01061533');
  const [isModalVisible, setModalVisible] = useState(false);

  const theme = useColorScheme();
  // Mock conversion rate (you can replace this with an API call)
  const conversionRate = 101810.47;
  

  const colors = Colors[theme ?? 'light'] || Colors.light;
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={[styles.container, { backgroundColor: colors.background } ]}>
        {/* Header */}
        <Text style={styles.header}>Convert</Text>

        {/* From Section (USDT) */}
        <Text style={styles.label}>From</Text>
        
          <View style={styles.inputContainer}>
            <View style={styles.currencySelector}>
              <View style={styles.currencyIcon}>
                <Text style={styles.currencyIconText}>T</Text>
              </View>
              <Text style={styles.currencyText}>USDT</Text>
              {/* <Ionicons name="arrow-drop-down" size={24} color="#fff" /> */}
            </View>
            
            <TextInput
              style={styles.input}
              value={usdtAmount}
              placeholder="1000"
              keyboardType="numeric" // ✅ Ensures only numbers are typed
              onChangeText={(text) => {
                text = text.replace(/[^0-9.]/g, ''); // Allow only numbers & decimals
                setUsdtAmount(text);
                
                // Convert to BTC immediately
                const usdtValue = parseFloat(text) || 0;
                setBtcAmount((usdtValue / conversionRate).toFixed(8).toString());
              }}
            />
            
            
            <Text style={styles.availableText}>Available: 2,035.12 USDT Max</Text>
          </View>
        

        {/* Swap Icon */}
        <TouchableOpacity style={styles.swapIcon}>
          <AntDesign name="swap" size={24} color="white" />
        </TouchableOpacity>

        {/* To Section (BTC) */}
        <Text style={styles.label}>To</Text>
        <View style={styles.inputContainer}>
          <View style={styles.currencySelector}>
            <View style={[styles.currencyIcon, { backgroundColor: '#F7931A' }]}>
              <Text style={styles.currencyIconText}>B</Text>
            </View>
            <Text style={styles.currencyText}>BTC</Text>
            {/* <Ionicons name="arrow-drop-down" size={24} color="#fff" /> */}
          </View>
          <TextInput
            style={styles.input}
            value={btcAmount}
            editable={false}
          />
        </View>
        <Text style={styles.rateText}>1 BTC = 101,810.47 USDT</Text>

        {/* Convert Button */}
        <TouchableOpacity style={styles.convertButton}
        onPress={() => setModalVisible(true)}>
          <Text style={styles.convertButtonText}>Convert</Text>
          
        </TouchableOpacity>

        {/* Confirmation Modal */}
        <Modal transparent={true} visible={isModalVisible} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>Confirmation</Text>

              {/* USDT to BTC Conversion Info */}
              <View style={styles.transactionBox}>
                <Text style={styles.transactionText}>USDT {usdtAmount} → BTC {btcAmount}</Text>
              </View>

              {/* Transaction Details */}
              <Text style={styles.details}>Type: Market</Text>
              <Text style={styles.details}>Transaction Fees: Free</Text>
              <Text style={styles.details}>Rate: 1 BTC = 100,035.0769 USDT</Text>

              {/* Confirm Button with Countdown */}
              <TouchableOpacity
                style={[styles.confirmButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2526',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#2A3435',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currencyIcon: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#00C4B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  currencyIconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  currencyText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 5,
  },
  input: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'right',
  },
  availableText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 5,
  },
  rateText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  swapIcon: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  convertButton: {
    backgroundColor: '#A855F7',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#333', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 10 },
  transactionBox: { backgroundColor: '#444', padding: 10, borderRadius: 8, marginBottom: 10 },
  transactionText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  details: { color: 'white', fontSize: 14, marginVertical: 2 },
  confirmButton: { backgroundColor: 'purple', padding: 15, borderRadius: 10, marginTop: 15 },
});

