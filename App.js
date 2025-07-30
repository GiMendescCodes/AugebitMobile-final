import 'react-native-gesture-handler'; // <- primeira linha
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import inicioRH from './frontend/pages/InicioRH';
import LoginFuncionario from './frontend/pages/Login';
import MapaSetores from './frontend/pages/MapaSetores';
import ListaFuncionarios from './frontend/pages/ListaFuncionarios';
import InicioFuncionario from './frontend/pages/InicioFuncionario';
import PerfilFuncionario from './frontend/pages/PerfilFuncionario';

const Stack = createNativeStackNavigator();

function EscolhaAcesso({ navigation }) {
  const scaleFuncionario = new Animated.Value(1);
  const scaleRH = new Animated.Value(1);

  const handlePress = (destino, scale) => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true })
    ]).start(() => {
      navigation.navigate(destino);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao{'\n'}Sistema Augebit</Text>
      <Text style={styles.subtitle}>Escolha seu perfil para acessar as funcionalidades adequadas.</Text>

      <View style={styles.acessoBox}>
        <View style={styles.questionContainer}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.question}>Você faz parte do RH ou é um funcionário?</Text>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleFuncionario }], width: '100%' }}>
          <TouchableOpacity
            style={[styles.button, styles.funcionario]}
            onPress={() => handlePress('LoginFuncionario', scaleFuncionario)}
          >
            <Image source={require('./assets/funcionario.png')} style={styles.icon} />
            <Text style={styles.buttonText}>FUNCIONÁRIO</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleRH }], width: '100%' }}>
          <TouchableOpacity
            style={[styles.button, styles.rh]}
            onPress={() => handlePress('inicioRH', scaleRH)}
          >
            <Image source={require('./assets/rh.png')} style={styles.icon} />
            <Text style={styles.buttonText}>RECURSOS HUMANOS</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EscolhaAcesso">
        <Stack.Screen name="EscolhaAcesso" component={EscolhaAcesso} options={{ headerShown: false }} />
        <Stack.Screen name="inicioRH" component={inicioRH} />
        <Stack.Screen name="LoginFuncionario" component={LoginFuncionario} />
        <Stack.Screen name="MapaSetores" component={MapaSetores} />
        <Stack.Screen name="ListaFuncionarios" component={ListaFuncionarios} />
        <Stack.Screen name="InicioFuncionario" component={InicioFuncionario} />
        <Stack.Screen name="PerfilFuncionario" component={PerfilFuncionario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9998FF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  acessoBox: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center'
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 50,
    height: 45,
    marginRight: 10
  },
  question: {
    fontSize: 16,
    color: '#9998FF',
    flex: 1,
    flexWrap: 'wrap'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6E6DFF',
    padding: 15,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center'
  },
  funcionario: { backgroundColor: '#6E6DFF' },
  rh: { backgroundColor: '#6E6DFF' },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  }
});