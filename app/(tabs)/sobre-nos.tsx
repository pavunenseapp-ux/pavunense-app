import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre Nós</Text>

        <Text style={styles.paragraph}>
          A <Text style={styles.bold}>Viação Pavunense</Text> é uma tradicional empresa de transporte público municipal do Rio de Janeiro, atuando principalmente na Zona Norte, além de operar na Zona Oeste e no Centro.
        </Text>

        <Text style={styles.paragraph}>
          Fundada em <Text style={styles.bold}>1962</Text>, após a dissolução da Empresa de Transportes Dragão, iniciou suas operações com a linha 779 (Pavuna ↔ Madureira). Desde então, vem ampliando sua atuação com novas linhas e melhorias operacionais.
        </Text>

        <Text style={styles.paragraph}>
          Ao longo dos anos, a Pavunense foi pioneira em diversas inovações, como a adoção do embarque pela frente, renovação da frota com veículos modernos e investimentos em acessibilidade.
        </Text>

        <Text style={styles.paragraph}>
          Atualmente, conta com uma frota renovada com veículos Euro-6, como os modelos Apache Vip V e Mascarello Gran Via, garantindo mais conforto e menor impacto ambiental.
        </Text>

        <Text style={styles.paragraph}>
          Nossa missão é conectar pessoas e bairros com segurança, eficiência e compromisso com a mobilidade urbana de qualidade. Seguimos firmes no propósito de oferecer um transporte confiável e moderno para todos.
        </Text>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 12,
    textAlign: 'justify',
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
});
