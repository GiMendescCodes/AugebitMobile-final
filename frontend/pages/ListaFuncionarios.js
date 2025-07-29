import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import FooterMenu from "../components/FooterMenu"; // ajuste o caminho se for diferente

export default function ListaFuncionarios({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.73/AugebitMobile-final/backend/funcionarios/listar_completo.php')
      .then(res => res.json())
      .then(data => {
        console.log('RESPOSTA:', data);

        // Verificação de tipo da resposta
        if (Array.isArray(data)) {
          setFuncionarios(data);
        } else {
          console.warn("A resposta da API não é um array:", data);
          setFuncionarios([]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar funcionários:", err);
        setFuncionarios([]);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Carregando...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header com gradiente */}
      <View style={styles.header}>
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting}>Painel de gerenciamento</Text>
            <Text style={styles.subtitle}>Confira os dados dos funcionários</Text>
          </View>
        </View>
      </View>

      {/* Main illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationShadow}>
          <Image source={require('../../assets/imgListaFuncionarios.png')} style={styles.mainIllustration} resizeMode="contain" />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {funcionarios.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>?</Text>
            </View>
            <Text style={styles.emptyText}>Nenhum funcionário encontrado.</Text>
          </View>
        ) : (
          funcionarios.map((func, index) => (
            <TouchableOpacity 
              key={func.id} 
              style={[styles.employeeCard, { transform: [{ scale: 1 }] }]}
              activeOpacity={0.95}
            >
              <View style={styles.cardGradient} />
              
              <View style={styles.cardHeader}>
                <View style={styles.profileContainer}>
                  <Image
                    source={{ uri: func.foto ? `http://192.168.1.73/AugebitMobile-final/backend/uploads/${func.foto}` : 'https://via.placeholder.com/60/6366f1/ffffff?text=👤' }}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileRing} />
                </View>
                <View style={styles.nameContainer}>
                  <Text style={styles.employeeName}>{func.nome}</Text>
                  <Text style={styles.employeeRole}>{func.cargo ?? 'Cargo'}</Text>
                </View>
                <View style={styles.cardNumber}>
                  <Text style={styles.cardNumberText}>#{String(index + 1).padStart(2, '0')}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.cardContent}>
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Contato</Text>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoTag, styles.emailTag]}>
                      <Text style={styles.tagText}>{func.email}</Text>
                    </View>
                    <View style={[styles.infoTag, styles.telefoneTag]}>
                      <Text style={styles.tagText}>{func.telefone}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Dados</Text>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoTag, styles.cpfTag]}>
                      <Text style={styles.tagText}>{func.cpf}</Text>
                    </View>
                    <View style={[styles.infoTag, styles.setorTag]}>
                      <Text style={styles.tagText}>{func.setor ?? 'SETOR'}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>Trabalho</Text>
                  <View style={styles.infoRow}>
                    <View style={[styles.infoTag, styles.admissaoTag]}>
                      <Text style={styles.tagText}>{func.horario_entrada ?? 'ENTRADA'}</Text>
                    </View>
                    <View style={[styles.infoTag, styles.salarioTag]}>
                      <Text style={styles.tagText}>R$ {parseFloat(func.salario ?? 0).toFixed(2)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <FooterMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2ff',
    paddingBottom: 60,
  },
  
  // Header styles
  header: {
    backgroundColor: '#f8f9ff',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 25,
    position: 'relative',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(153, 152, 255, 0.03)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  logoImage: {
    width: 140,
    height: 70,
    marginRight: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Illustration styles
  illustrationContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
    alignItems: 'center',
  },
  illustrationShadow: {
    shadowColor: '#9998FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  mainIllustration: {
    width: 320,
    height: 180,
  },

  // ScrollView styles
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Card styles
  employeeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    marginBottom: 20,
    padding: 0,
    shadowColor: '#9998FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#9998FF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
  },
  profileContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  profileRing: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#9998FF',
    opacity: 0.3,
  },
  nameContainer: {
    flex: 1,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  employeeRole: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  cardNumber: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cardNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9998FF',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 20,
  },

  cardContent: {
    padding: 20,
    paddingTop: 15,
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTag: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#9998FF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  emailTag: {
    backgroundColor: '#9998FF',
  },
  telefoneTag: {
    backgroundColor: '#9998FF',
  },
  cpfTag: {
    backgroundColor: '#9998FF',
  },
  admissaoTag: {
    backgroundColor: '#9998FF',
  },
  setorTag: {
    backgroundColor: '#9998FF',
  },
  salarioTag: {
    backgroundColor: '#9998FF',
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Empty state
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#9998FF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});