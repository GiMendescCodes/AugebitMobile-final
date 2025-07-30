import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');

// Componente para o gráfico circular
const CircularProgress = ({ percentage }) => {
  const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.circularProgressContainer}>
      <Svg width="140" height="140" style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="12"
        />
        <Circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#6366f1"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View style={styles.percentageContainer}>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>
    </View>
  );
};

// Ícones como imagens
const MailIcon = () => (
  <Image source={require('../../assets/email.png')} style={styles.iconText} resizeMode="contain" />
);

const PhoneIcon = () => (
  <Image source={require('../../assets/phone.png')} style={styles.iconText} resizeMode="contain" />
);

const HomeIcon = () => (
  <Image source={require('../../assets/casa.png')} style={styles.iconText} resizeMode="contain" />
);

const ShieldIcon = () => (
  <Image source={require('../../assets/dinheiro.png')} style={styles.iconText} resizeMode="contain" />
);

const monthlyPerformance = [
  { month: 'Mar.', value: 70 },
  { month: 'Abr.', value: 80 },
  { month: 'Mai.', value: 75 },
];

const ChevronRightIcon = () => (
  <Text style={styles.chevronIcon}>›</Text>
);

export default function Perfil({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header com gradiente */}
      <View style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor="#EEEEFF" />
        <TouchableOpacity onPress={() => navigation.goBack('Home')} style={styles.backButton}>
  <Icon name="arrow-back" size={24} color="#fff" />
</TouchableOpacity>

        {/* Foto de perfil */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
            }}
            style={styles.profileImage}
          />
        </View>

        <Text style={styles.profileName}>Jorge Rivera Herrans</Text>
        <Text style={styles.profileBirth}>Nascimento: 06/02/1998</Text>

        {/* Grid de informações */}
        <View style={styles.infoGrid}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>CPF:</Text>
            <Text style={styles.infoValue}>999.999.000-01</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>RG:</Text>
            <Text style={styles.infoValue}>11.111.111-01</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Estado Civil:</Text>
            <Text style={styles.infoValue}>Casado</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gênero:</Text>
            <Text style={styles.infoValue}>Masculino</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>PIS/PASEP: </Text>
            <Text style={styles.infoValue}>Lorem Lorem</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Carteira:</Text>
            <Text style={styles.infoValue}>Lorem Lorem</Text>
          </View>
        </View>

        {/* Botões de ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MailIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <PhoneIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <HomeIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>
        {/* Card do Banco */}
        <View style={styles.bankCard}>
          <View style={styles.bankCardHeader}>
            <Text style={styles.bankCardTitle}>Banco do Brasil</Text>
            <View style={styles.shieldContainer}>
              <ShieldIcon />
            </View>
          </View>
          <View style={styles.bankInfo}>
            <View style={styles.bankInfoRow}>
              <Text style={styles.bankInfoLabel}>Tipo de Conta:</Text>
              <Text style={styles.bankInfoValue}>Corrente</Text>
            </View>
            <View style={styles.bankInfoRow}>
              <Text style={styles.bankInfoLabel}>Número da Conta:</Text>
              <Text style={styles.bankInfoValue}>12345-6</Text>
            </View>
            <View style={styles.bankInfoRow}>
              <Text style={styles.bankInfoLabel}>Agência:</Text>
              <Text style={styles.bankInfoValue}>001 - Centro Empresarial</Text>
            </View>
          </View>
        </View>

        {/* Card do Cargo */}
        <TouchableOpacity style={styles.roleCard}>
          <Text style={styles.roleText}>Diretor geral/RH</Text>
          <ChevronRightIcon />
        </TouchableOpacity>

        {/* Card de Desempenho */}
        <View style={styles.performanceCard}>
          <Text style={styles.performanceTitle}>Desempenho Profissional</Text>

          {/* Gráfico circular */}
          <CircularProgress percentage={90} />

          {/* Estatísticas mensais como gráfico de colunas */}
          <View style={styles.columnChart}>
            {monthlyPerformance.map((item, index) => (
              <View key={index} style={styles.columnItem}>
                <Text style={styles.columnValue}>{item.value}%</Text>
                <View style={styles.columnBarContainer}>
                <LinearGradient
  colors={['#6366f1', '#3b82f6']}
  style={[styles.columnBar, { height: `${item.value}%` }]}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }}
/>
                </View>
                <Text style={styles.columnLabel}>{item.month}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
  },
  header: {
    backgroundColor: '#8685FD',
    paddingTop: 48,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginBottom: 20,
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  profileBirth: {
    fontSize: 14,
    color: '#E9D5FF',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  infoGrid: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#E9D5FF',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 22,
    color: 'white',
  },
  content: {
    padding: 20,
    marginTop: -12,
  },
  bankCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  bankCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  bankCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  shieldContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bankInfoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  bankInfoValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  roleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  chevronIcon: {
    fontSize: 20,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  performanceCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 24,
  },
  
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 65,
    position: 'relative',
  },
  circularSvg: {
    transform: [{ rotate: '-90deg' }],
  },
  percentageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  columnChart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
    marginTop: 16,
  },
  columnItem: {
    alignItems: 'center',
    width: 40,
  },
  columnBarContainer: {
    height: 80,
    width:24,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    justifyContent: 'flex-end',
    marginVertical: 4,
  },
  columnBar: {
    width: 24,
    height: 80,
    backgroundColor: '#8CF6',
    borderRadius: 20,
  },
  columnLabel: {
    fontSize: 12,
    color: '#374151',
    marginTop: 4,
    fontWeight: '600',
  },
  columnValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  
});
