import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, Image, Alert, ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!nome || !cpf) {
      Alert.alert('Erro', 'Preencha nome e CPF.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://10.136.23.30/validar_login.php', {
        nome: nome.trim(),
        cpf: cpf.trim(),
      });

      if (response.data.success) {
        Alert.alert('Bem-vindo', response.data.message, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('InicioFuncionario'),
          },
        ]);
      } else {
        Alert.alert('Erro', response.data.message);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginCard}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#9998FF', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  loginCard: { backgroundColor: '#fff', borderRadius: 20, padding: 30, width: '100%', maxWidth: 350, elevation: 8 },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 300, height: 150 },
  inputContainer: { backgroundColor: '#F5F5F7', borderRadius: 12, marginBottom: 15, paddingHorizontal: 15, height: 50, justifyContent: 'center' },
  input: { fontSize: 16, color: '#333' },
  loginButton: { backgroundColor: '#6E6DFF', borderRadius: 12, height: 50, justifyContent: 'center', alignItems: 'center' },
  loginButtonDisabled: { backgroundColor: '#9998FF', opacity: 0.7 },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default LoginScreen;
