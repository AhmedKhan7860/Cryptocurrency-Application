import {  View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ConvertScreen(){
  const [usdtAmount, setUsdtAmount] = useState('1,000');
  const [btcAmount, setBtcAmount] = useState('0.01061533');

  // Mock conversion rate (you can replace this with an API call)
  const conversionRate = 101810.47;

  // Function to handle keypad input
  const handleKeypadPress = (value: string) => {
    setUsdtAmount((prev) => {
      let newAmount = prev;
  
      if (value === '⌫') {
        newAmount = prev.slice(0, -1) || '0';
      } else {
        newAmount = prev === '0' ? value : prev + value;
      }
  
      // Remove commas before converting
      const usdtValue = parseFloat(newAmount.replace(/,/g, '')) || 0;
      const btcValue = usdtValue / conversionRate;
  
      setBtcAmount(btcValue.toFixed(8).toString()); // Update BTC amount
      return newAmount; // Update USDT amount
    });
  };

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
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
        <TouchableOpacity style={styles.convertButton}>
          <Text style={styles.convertButtonText}>Convert</Text>
          
        </TouchableOpacity>

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
});

