import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from "expo-font";
import { Image } from 'react-native';
import logo from '../../assets/logo.png';

const { width } = Dimensions.get('window');

const StudentDashboard = () => {
useFonts({
  Eurostile: require('../../assets/fonts/eurostile.ttf'),  
  Montserrat: require('../../assets/fonts/Montserrat-VariableFont_wght.ttf'),  
});

  
  const [performance, setPerformance] = useState(90);
  
  const monthlyPerformance = [
    { month: 'Mar.', value: 70 },
    { month: 'Abr.', value: 80 },
    { month: 'Mai.', value: 75 }
  ];

  const courses = [
    { name: 'Modelagem Paramétrica', progress: 50 },
    { name: 'Prototipagem e Impressão 3D', progress: 50 },
    { name: 'Desenho Técnico Mecânico', progress: 50 }
  ];

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
        <View style={styles.percentageText}>
          <Text style={styles.percentageNumber}>{percentage}%</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#EEEEFF', '#EEEEFF', '#EEEEFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerContainer}
        >
          {/* Top Header */}
          <View style={styles.topHeader}>
          <Image source={logo} style={styles.logoImage} />
            <View  style={{ marginLeft: -100, marginTop: 15}}>
              <Text style={styles.greeting}>Ola, Giovanna!</Text>
              <Text style={styles.subtitle}>Veja suas atividades</Text>
              <Text style={styles.subtitle}>para hoje</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={13} color="white" />
            </View>
          </View>

          {/* Date and Schedule Card */}
          <View style={styles.scheduleCard}>
            <View style={styles.scheduleContent}>
              <View>
                <Text style={styles.dayLabel}>TERÇA-FEIRA</Text>
                <View style={styles.dateContainer}>
                  <Text style={styles.dateNumber}>11.10</Text>
                </View>
                <Text style={styles.monthText}>JUN</Text>
              </View>
              <View style={styles.timeContainer}>
                <View style={styles.timeBlock}>
                  <Text style={styles.timeLabel}>ENTRADA</Text>
                  <Text style={styles.timeValue}>08:00 am</Text>
                </View>
                <View style={styles.timeBlock}>
                  <Text style={styles.timeLabel1}>SAÍDA</Text>
                  <Text style={styles.timeValue1}>Pendente</Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Performance Section */}
        <View style={styles.contentContainer}>
          <View style={styles.performanceCard}>
            <View style={styles.performanceHeader}>
              <Text style={styles.performanceTitle}>Desempenho Profissional em %</Text>
            </View>
            
            <View style={styles.circularProgressWrapper}>
              <CircularProgress percentage={performance} />
            </View>

            {/* Monthly Performance Bars */}
            <View style={styles.monthlyPerformanceContainer}>
              {monthlyPerformance.map((month, index) => (
                <View key={month.month} style={styles.monthlyPerformanceItem}>
                  <Text style={styles.monthLabel}>{month.month}</Text>
                  <View style={styles.barContainer}>
                    <View style={styles.barBackground}>
                      <LinearGradient
                        colors={['#6366f1', '#3b82f6']}
                        style={[
                          styles.barFill,
                          { height: `${month.value}%` }
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={styles.monthValue}>{month.value}%</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Courses Section */}
          <View style={styles.coursesContainer}>
            {courses.map((course, index) => (
              <View key={index} style={styles.courseCard}>
                <View style={styles.courseContent}>
                  <LinearGradient
                    colors={['#818cf8', '#8b5cf6']}
                    style={styles.courseIcon}
                  >
                    <View style={styles.courseIconInner} />
                  </LinearGradient>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseLabel}>Curso</Text>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseProgress}>{course.progress}% completo</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEFF',
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  greeting: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: "Eurostile",
    letterSpacing: 1,
    fontWeight: 100
  },
  subtitle: {
    color: '#black',
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '300',
  },
  avatarContainer: {
    backgroundColor: '#4746D8',
    padding: 12,
    borderRadius: 50,
    marginTop: 15,
    borderWidth: 4,             // Define a largura da borda
    borderColor: '#6E6DFF', 
  },
  scheduleCard: {
    backgroundColor: 'rgba(68, 0, 255, 0.07)',
    borderRadius: 16,
    padding: 20,
    
  },
  scheduleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayLabel: {
    color: '#6E6DFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  dateNumber: {
    color: '#6E6DFF',
    fontSize: 40,
    fontWeight: '700',
    
  },
  monthText: {
    color: '#6E6DFF',
    fontSize: 30,
    fontWeight: '500',
    marginTop: -4,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeBlock: {
    marginBottom: 16,
  },
  timeLabel: {
    color: '#6E6DFF',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 4,
    marginRight: 5
  },
  timeLabel1: {
    color: '#6E6DFF',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
    marginBottom: 4,
    marginRight: 5
  },
  timeValue: {
    color: '#black',
    fontWeight: '300',
  },
  timeValue1: {
    color: '#black',
    fontWeight: '300',
    marginRight: 11
  },
  contentContainer: {
    padding: 24,
  },
  performanceCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  performanceHeader: {
    marginBottom: 24,
  },
  performanceTitle: {
    color: '#111827',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
  },
  circularProgressWrapper: {
    alignItems: 'center',
    marginBottom: 32,
  },
  circularProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  monthlyPerformanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  monthlyPerformanceItem: {
    alignItems: 'center',
  },
  monthLabel: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
  },
  barBackground: {
    width: 24,
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 12,
  },
  monthValue: {
    color: '#1f2937',
    fontWeight: '600',
    fontSize: 14,
    marginTop: 12,
  },
  coursesContainer: {
    gap: 16,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    shadowColor: 'rgba(125, 81, 255, 0.81)',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 19,
    elevation: 5,
  },
  courseContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  courseIconInner: {
    width: 24,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseLabel: {
    fontWeight: 'bold',
    color: '#111827',
    fontSize: 16,
    marginBottom: 4,
  },
  courseName: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  courseProgress: {
    color: '#6b7280',
    fontSize: 14,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginTop: 5,
    
  },
  logoAndGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  
  },
  
});

export default StudentDashboard;