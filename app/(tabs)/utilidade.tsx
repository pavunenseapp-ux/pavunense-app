import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Platform,
  //SafeAreaProvider,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

type ItemType = {
  title: string;
  image: any;
  link?: string;
  navigateTo?: string;
  accessibilityLabel?: string;
};

const items: ItemType[] = [
  {
    title: 'Detran RJ',
    image: require('../../assets/detran/index.jpeg'),
    link: 'https://www.detran.rj.gov.br',
  },
  {
    title: 'Caixa Econômica Federal',
    image: require('../../assets/caixa/index.png'),
    link: 'https://www.caixa.gov.br/Paginas/home-caixa.aspx',
  },
  {
    title: 'Banco do Brasil',
    image: require('../../assets/BB/index.png'),
    link: 'https://www.bb.com.br/pbb/pagina-inicial#/',
  },
  {
    title: 'SPC',
    image: require('../../assets/SPC/index.jpeg'),
    link: 'https://www.spcbrasil.org.br/',
  },
  {
    title: 'INSS',
    image: require('../../assets/inss/index.png'),
    link: 'https://www.gov.br/inss/pt-br',
  },
  {
    title: 'Advogados Online',
    image: require('../../assets/ADON/index.png'),
    link: 'https://www.jusbrasil.com.br/l/advogados-online',
  },
  {
    title: 'Ministério da Educação RJ',
    image: require('../../assets/MDE/index.png'),
    link: 'http://portal.mec.gov.br/acessibilidade-sp-940674614/190-secretarias-112877938/setec-1749372213/12556-rio-de-janeiro',
  },
  {
    title: 'Riocard RJ',
    image: require('../../assets/riocard/index.jpeg'),
    link: 'https://www.cartaoriocard.com.br/rcc/institucional',
  },
  {
    title: 'Jaé RJ',
    image: require('../../assets/jae/favicon.jpg'),
    link: 'https://jae.com.br/',
  },
  {
    title: 'Prefeitura do RJ',
    image: require('../../assets/prefeitura/index.png'),
    link: 'http://prefeitura.rio/todas-as-noticias/',
  },
  {
    title: 'Governo do Estado RJ',
    image: require('../../assets/estado/index.jpeg'),
    link: 'http://www.rj.gov.br/',
  },
  {
    title: 'Polícia Militar RJ',
    image: require('../../assets/pm/index.png'),
    link: 'https://sepm.rj.gov.br/',
  },
  {
    title: 'Polícia Civil RJ',
    image: require('../../assets/pc/index.png'),
    link: 'http://www.policiacivilrj.net.br/index.php',
  },
  {
    title: 'Corpo de Bombeiros Militar RJ',
    image: require('../../assets/cb/index.jpeg'),
    link: 'http://www.cbmerj.rj.gov.br/',
  },
  {
    title: 'Defesa Civil RJ',
    image: require('../../assets/dc/index.png'),
    link: 'http://www.defesacivil.rj.gov.br/',
  },
  {
    title: 'Receita Federal',
    image: require('../../assets/receitafederal/receita.png'),
    link: 'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp',
  },
  {
    title: 'Polícia Rodoviária Federal',
    image: require('../../assets/prf/Prf_brasao_novo.jpg'),
    link: 'https://www.gov.br/prf/pt-br',
  },
  {
    title: 'Ministério Público RJ',
    image: require('../../assets/ministeriopublico/index.png'),
    link: 'https://www.prt1.mpt.mp.br/',
  },
];

export default function Utilidade({ navigation }: { navigation: NavigationProp<any> }) {
  const handlePress = (item: ItemType) => {
    if (item.link) {
      Linking.openURL(item.link);
    } else if (item.navigateTo) {
      navigation.navigate(item.navigateTo);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <ScrollView>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handlePress(item)}
            accessibilityRole="button"
            accessibilityLabel={`Abrir ${item.title}`}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
    marginHorizontal: 10,
  },
  image: {
    marginRight: 16,
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
    color: '#333333',
  },
});
