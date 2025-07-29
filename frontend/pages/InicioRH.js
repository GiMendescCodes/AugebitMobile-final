import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";

import FooterMenu from "../components/FooterMenu"; // ajuste o caminho se for diferente

const { width } = Dimensions.get("window");

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const days = [
      "DOMINGO",
      "SEGUNDA-FEIRA",
      "TERÇA-FEIRA",
      "QUARTA-FEIRA",
      "QUINTA-FEIRA",
      "SEXTA-FEIRA",
      "SÁBADO",
    ];
    const months = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate().toString().padStart(2, "0");
    const month = months[date.getMonth()];
    return { dayName, day, month };
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const { dayName, day, month } = formatDate(currentTime);
  const time = formatTime(currentTime);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6B73FF" />

      <View style={[styles.header, { backgroundColor: "#6B73FF" }]}>
        <View style={styles.headerContent}>
          <View style={styles.leftSection}>
            <View style={styles.logoFundo}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={styles.greetingSection}>
              <Text style={styles.greeting}>Bem vindo ao gerenciamento Augebit!</Text>
              <Text style={styles.subGreeting}>Confira as pendencias</Text>
              <Text style={styles.subGreeting}>e acesse outras áreas por aqui</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.clockSection}>
          <Text style={styles.dayText}>{dayName}, {day} {month}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.card} activeOpacity={1}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>10</Text>
              </View>
              <Image
                source={require("../../assets/funcionarioImg.png")}
                style={styles.cardImg}
                resizeMode="contain"
              />
              <Text style={styles.cardLabel}>Funcionários</Text>
              <Text style={styles.cardSubLabel}>Totais</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} activeOpacity={1}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>08</Text>
              </View>
              <Image
                source={require("../../assets/solicitacaoimg.png")}
                style={styles.cardImg}
                resizeMode="contain"
              />
              <Text style={styles.cardLabel}>Solicitações</Text>
              <Text style={styles.cardSubLabel}>pendentes</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.card} activeOpacity={1}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>8</Text>
              </View>
              <Image
                source={require("../../assets/pontosImg.png")}
                style={styles.cardImg}
                resizeMode="contain"
              />
              <Text style={styles.cardLabel}>Pontos</Text>
              <Text style={styles.cardSubLabel}>Registrados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} activeOpacity={1}>
              <View style={styles.cardBadge}>
                <Text style={styles.badgeText}>08</Text>
              </View>
              <Image
                source={require("../../assets/justificativasimg.png")}
                style={styles.cardImg}
                resizeMode="contain"
              />
              <Text style={styles.cardLabel}>Justificativas</Text>
              <Text style={styles.cardSubLabel}>pendentes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FooterMenu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
    marginTop: 15,
    marginLeft: 10,
  },
  subGreeting: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 18,
    marginLeft: 10,
  },
  profileButton: {
    width: 40,
    height: 40,
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    fontSize: 20,
  },
  logo: {
    width: 50,

  },
  logoFundo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 80,
    width: 70,
    height: 70,
    marginTop: 23,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  clockSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 10,
  },
  dayText: {
    fontSize: 14,
    color: "#6B73FF",
    fontWeight: "600",
    marginBottom: 8,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#6B73FF",
    marginBottom: 4,
    fontVariant: ["tabular-nums"],
  },
  monthText: {
    fontSize: 20,
    color: "#6B73FF",
    fontWeight: "600",
  },
  cardsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  card: {
    width: (width - 55) / 2,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minHeight: 100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#F0F0FF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  iconText: {
    fontSize: 20,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
    textAlign: "center",
  },
  cardSubLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  cardImg: {
    height:
  }
  cardBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#9998FF",
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 0,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 30,
  },
});
