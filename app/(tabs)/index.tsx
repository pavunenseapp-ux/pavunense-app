import React, { useEffect, useState } from 'react';
//import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';

type Notification = {
  title?: string;
  body?: string;
  link?: string;
  [key: string]: any;
};

export default function App() {
  const emailLoginURL = 'https://mail.google.com/';
  const driveFolderURL = 'https://drive.google.com/drive/folders/18DKtlWH1lVIL61p-dy6CR8hx6BQ24GPZ?usp=sharing';

  const [notificacoes, setNotificacoes] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotificacoes = () => {
    setLoading(true);
    fetch("https://raw.githubusercontent.com/pavunenseapp-ux/push.app_pavunense/refs/heads/main/push.json")
      .then(response => response.json())
      .then(data => {
        setNotificacoes(data.notificacoes || []);
      })
      .catch(error => {
        console.error("Erro ao buscar JSON:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  if (loading) {
    return (
      <SafeAreaProvider style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.safeArea} >
      <View style={styles.container}>
        <Text style={styles.title}>App Pavunense</Text>

        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => Linking.openURL(emailLoginURL)}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/fluency/96/000000/email.png' }}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Login Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => Linking.openURL(driveFolderURL)}
          >
            <Image
              source={{ uri: 'https://img.icons8.com/fluency/96/000000/google-drive.png' }}
              style={styles.icon}
            />
            <Text style={styles.iconText}>Google Drive</Text>
          </TouchableOpacity>
        </View>

        {/* 🔁 Botão de atualizar notificações */}
        <TouchableOpacity style={styles.refreshButton} onPress={fetchNotificacoes}>
          <Text style={styles.refreshText}>🔄 Atualizar Notificações</Text>
        </TouchableOpacity>

        <ScrollView style={{ width: '100%' }}>
          {notificacoes.length === 0 && (
            <Text style={styles.noNotificationsText}>Nenhuma notificação disponível.</Text>
          )}

          {notificacoes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.notificationCard}
              onPress={() => item.link ? Linking.openURL(item.link) : undefined}
            >
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationBody}>{item.body ?? ''}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, alignItems: 'center', padding: 10 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  icons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  iconText: {
    fontSize: 14,
    color: '#333',
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  notificationBody: {
    fontSize: 14,
    color: '#555',
  },
  noNotificationsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },

  // 🔁 Estilo do botão de refresh
  refreshButton: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  refreshText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
});
