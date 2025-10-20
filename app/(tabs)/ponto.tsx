import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as MailComposer from 'expo-mail-composer';

export default function Ponto() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<any>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [timestamp, setTimestamp] = useState<{ human: string } | null>(null);

  // Função para formatar data/hora
  const generateTimestamps = () => {
    const now = new Date();
    return {
      iso: now.toISOString(),
      human: now.toLocaleString('pt-BR'),
    };
  };

  // Captura localização + endereço completo ao iniciar
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão de localização é necessária.');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setTimestamp(generateTimestamps());

      // Busca o endereço aproximado (bairro, cidade etc.)
      try {
        const [place] = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        setAddress(place);
      } catch (error) {
        console.warn('Erro ao obter endereço:', error);
        setAddress(null);
      }
    })();
  }, []);

  // Tirar uma foto com a câmera
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Permissão da câmera é necessária.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Enviar email com localização + foto + data/hora + endereço
  const handleSendEmail = async () => {
    if (!location || !imageUri || !timestamp) {
      Alert.alert('Erro', 'Você precisa capturar a localização, a foto e a hora antes de enviar.');
      return;
    }

    const isAvailable = await MailComposer.isAvailableAsync();
    if (!isAvailable) {
      Alert.alert('Erro', 'Envio de e-mails não disponível neste dispositivo.');
      return;
    }

    const coords = location.coords;
    const addr = address
      ? `${address.street || ''}, ${address.subregion || address.neighborhood || ''}, ${address.city || ''} - ${address.region || ''}, ${address.country || ''}`
      : 'Endereço não disponível';

    const body = `
Registro de ponto realizado com sucesso!

📍 Localização:
Latitude: ${coords.latitude}
Longitude: ${coords.longitude}
Endereço aproximado: ${addr}

🕒 Data e Hora:
Formato legível: ${timestamp.human}

📸 Foto em anexo.

-------------------------
Este é um registro automático enviado pelo app.
    `.trim();

    await MailComposer.composeAsync({
      recipients: ['pavunenseapp@gmail.com'],
      subject: '📌 Registro de Ponto - App',
      body,
      attachments: [imageUri],
    });
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Ponto</Text>

        {timestamp && (
          <Text style={styles.timestamp}>
            Data/Hora: {'\n'}
            {timestamp.human}
          </Text>
        )}

        {location && address && (
          <Text style={styles.locationText}>
            📍 Localização: {'\n'}
            Lat: {location.coords.latitude.toFixed(6)} | Lon: {location.coords.longitude.toFixed(6)}
            {'\n'}
            {address.street || ''}, {address.subregion || address.neighborhood || ''}, {address.city || ''} - {address.region || ''}, {address.country || ''}
          </Text>
        )}

        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        <TouchableOpacity style={styles.button} onPress={handleTakePhoto}>
          <Text style={styles.buttonText}>📸 Tirar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#007BFF' }]}
          onPress={handleSendEmail}
        >
          <Text style={styles.buttonText}>📤 Enviar Registro</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

// Estilos mantidos, com pequenas melhorias
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  locationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#444',
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
