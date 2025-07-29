import { useNavigation, useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function FooterMenu() {
  const navigation = useNavigation();
  const route = useRoute();

  function goTo(screen) {
    if (route.name !== screen) {
      navigation.navigate(screen);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => goTo("MapaSetores")}>
          <Image
            source={require("../../assets/location.png")}
            style={[styles.icon, route.name === "MapaSetores" && styles.active]}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goTo("inicioRH")}>
          <View style={styles.centerIcon}>
            <Image
              source={require("../../assets/home.png")}
              style={[styles.icon, route.name === "inicioRH" && styles.active]}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => goTo("ListaFuncionarios")}>
          <Image
            source={require("../../assets/usuarios.png")}
            style={[styles.icon, route.name === "ListaFuncionarios" && styles.active]}
          />
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
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#6C63FF",
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
    tintColor: "white",
  },
  active: {
    tintColor: "#1a1a1a",
  },
  centerIcon: {
    backgroundColor: "#4e47d6",
    padding: 12,
    borderRadius: 25,
  },
});
