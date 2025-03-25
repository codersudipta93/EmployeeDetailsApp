import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";
import { useFormContext } from "react-hook-form";

//Coponent
import QRScanner from "../components/QRScanner";
import Header from "../components/Header";
import Button from "../components/Button";


const Page1 = ({ }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();

  const [showScanner, setShowScanner] = useState(false);
  const { setValue, watch } = useFormContext();
  const qrCode = watch("qrCode");

  //Set QR Value
  const handleQRRead = (value) => {
    console.log("Scanned QR Code:", value);
    setValue("qrCode", value);
    setShowScanner(false);
  };

  const handleNext = () => {
    navigation.navigate("Page2")
  };

  // Responsive styles based on device dimensions
  const responsiveStyles = StyleSheet.create({
    container: {
      width: width * 0.9,
      maxWidth: 500,
      paddingVertical: height * 0.05,
      justifyContent: 'center',
      alignSelf: 'center'
    },
    title: {
      fontSize: Math.min(22, width * 0.06),
    },
    content: {
      padding: Math.min(25, width * 0.06),
      borderRadius: 20,
    },
  });

  return (
    <LinearGradient
      colors={['#6A11CB', '#2575FC']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.gradientContainer}>

        {/* Custom Header */}
        <Header title="Add Details" backAction={() => { navigation.goBack() }} />

        <View style={[styles.container, responsiveStyles.container]}>
          <View style={[
            styles.content,
            responsiveStyles.content
          ]}>
            <Text style={{textAlign:'right',fontWeight:'600',fontSize:14,marginBottom:12}}>1/2</Text>
            <Text style={[
              styles.title,
              responsiveStyles.title
            ]}>
              Scan QR Code
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                value={qrCode}
                placeholder="QR Code"
                placeholderTextColor="#888"
                editable={false}
                style={styles.input}
              />
              <Ionicons name="qr-code-outline" size={26} color="#6A11CB" style={styles.inputIcon} onPress={() => setShowScanner(true)} />
            </View>

            {/* Open QR Scanner Button */}
            <View style={[styles.navigationContainer, { marginBottom: 10 }]}>
              <Button
                onPress={() => setShowScanner(true)}
                icon={<Ionicons name="scan" size={24} color="white" />}
                title="Scan QR"
                colors={['#ab7e03', '#ab7e03']}
                width="100%"
              />
            </View>

            {/* Next Page Button */}
            <View style={styles.navigationContainer}>
              <Button
                onPress={() => handleNext()}
                righticon={<Ionicons name="arrow-forward" size={20} color="white" style={{ marginLeft: 10 }} />}
                title="Next"
                colors={['#250259', '#250259']}
                disabled={!qrCode}
                width="100%"
              />
            </View>
          </View>
        </View>

        {/* QR Scanner Overlay */}
        {showScanner && (
          <QRScanner
            onRead={handleQRRead}
            onClose={() => setShowScanner(false)}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Page1;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: "#333",
  }
});