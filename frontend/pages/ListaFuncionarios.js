import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

export default function ListaFuncionarios({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://10.0.2.2/backend/api/funcionarios/listar_completo.php')
      .then(res => res.json())
      .then(data => {
        setFuncionarios(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Text>Carregando...</Text>;

  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <Text style={styles.title}>Lista de Funcionários</Text>
      <ScrollView>
        {funcionarios.length === 0 ? (
          <Text>Nenhum funcionário encontrado.</Text>
        ) : (
          funcionarios.map(func => (
            <View key={func.id} style={styles.card}>
              <Image
                source={{ uri: func.foto || 'https://via.placeholder.com/60' }}
                style={styles.foto}
              />
              <View style={styles.info}>
                <Text style={styles.nome}>{func.nome}</Text>
                <Text>Email: {func.email}</Text>
                <Text>Telefone: {func.telefone}</Text>
                <Text>CPF: {func.cpf}</Text>
                <Text>Cargo: {func.cargo}</Text>
                <Text>Setor: {func.setor}</Text>
                <Text>Entrada: {func.horario_entrada}</Text>
                <Text>Saída: {func.horario_saida}</Text>
                <Text>Salário: R$ {func.salario.toFixed(2)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      {/* Aqui você pode criar o menu inferior com TouchableOpacity */}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', margin: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  foto: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  info: { flex: 1 },
  nome: { fontWeight: 'bold', fontSize: 18 },
});
