import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Easing,
  useEffect,
} from "react-native";
import React, { useRef } from "react";

export default function FooterMenu() {
  const navigation = useNavigation();
  const route = useRoute();

  // Animação de escala ao trocar de página
  const scaleAnim = useRef(new Animated.Value(1)).current;

  function animateIcon() {
    scaleAnim.setValue(0.8); // Começa menor
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.exp),
    }).start();
  }

  function goTo(screen) {
    if (route.name !== screen) {
      animateIcon();
      navigation.navigate(screen);
    }
  }

  const getIcon = (screen, icon, iconActive) => {
    const isActive = route.name === screen;
    const iconElement = (
      <Animated.Image
        source={isActive ? iconActive : icon}
        style={[styles.icon, isActive && { transform: [{ scale: scaleAnim }] }]}
      />
    );

    return isActive ? (
      <View style={styles.centerIcon}>{iconElement}</View>
    ) : (
      iconElement
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        {/* Botão Location */}
        <TouchableOpacity onPress={() => goTo("MapaSetores")}>
          {getIcon(
            "MapaSetores",
            require("../../assets/location.png"),
            require("../../assets/locationComplete.png")
          )}
        </TouchableOpacity>

        {/* Botão Home */}
        <TouchableOpacity onPress={() => goTo("inicioRH")}>
          {getIcon(
            "inicioRH",
            require("../../assets/home.png"),
            require("../../assets/homeComplete.png")
          )}
        </TouchableOpacity>

        {/* Botão Usuários */}
        <TouchableOpacity onPress={() => goTo("ListaFuncionarios")}>
          {getIcon(
            "ListaFuncionarios",
            require("../../assets/usuarios.png"),
            require("../../assets/usuariosComplete.png")
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
    marginBottom: 50,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6E6DFF",
    width: 220,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  centerIcon: {
    backgroundColor: "#4746D8",
    padding: 12,
    borderRadius: 25,
  },
});
