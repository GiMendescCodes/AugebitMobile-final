import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Modal,
    Pressable,
} from 'react-native';

import FooterMenu from "../components/FooterMenu";

const setores = {
    RH: { top: 120, left: 80 },
    Financeiro: { top: 200, left: 120 },
    TI: { top: 300, left: 80 },
    Comercial: { top: 250, left: 200 },
    Marketing: { top: 180, left: 250 },
};

export default function MapaFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado para controlar o modal custom
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        fetch("http://192.168.1.73/AugebitMobile-final/backend/listar_funcionarios_ativos.php")
            .then(res => res.text())
            .then(text => {
                try {
                    const data = JSON.parse(text);
                    setFuncionarios(data);
                    setLoading(false);
                } catch (error) {
                    console.error("Erro ao fazer parse do JSON:", error);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Erro ao carregar funcionários:", error);
                setLoading(false);
            });
    }, []);

    // Função para abrir o modal com dados
    function showAlert(title, message) {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Controle de departamentos!</Text>
                        <Text style={styles.subtitle}>Acompanhe os setores da empresa</Text>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    <Image
                        source={require('../../assets/cardMapaPage.png')}
                        style={styles.cardImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.mapContainer}>
                    <Image
                        source={require('../../assets/mapa.png')}
                        style={styles.mapImage}
                        resizeMode="contain"
                    />

                    {!loading && funcionarios.map(func => {
                        const pos = setores[func.setor];
                        if (!pos) return null;

                        return (
                            <TouchableOpacity
                                key={func.id}
                                style={[styles.bolinha, { top: pos.top, left: pos.left }]}
                                onPress={() => showAlert(func.nome, `Setor: ${func.setor}\nCargo: ${func.cargo}`)}
                            >
                                <Image
                                    source={{ uri: `http://192.168.1.73/AugebitMobile-final/backend/uploads/${func.foto}` }}
                                    style={styles.fotoFuncionario}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            <FooterMenu />

            {/* Modal customizado */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={alertVisible}
                onRequestClose={() => setAlertVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{alertTitle}</Text>
                        <Text style={styles.modalMessage}>{alertMessage}</Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setAlertVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    scrollContainer: {
        paddingBottom: 100,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
    },
    logoContainer: {
        width: 80,
        height: 50,
    },
    logoImage: {
        width: '100%',
        height: 60,
    },
    greetingContainer: {
        flex: 1,
        paddingLeft: 15,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#6B7280',
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    cardImage: {
        width: '100%',
        height: 244,
    },
    mapContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    mapImage: {
        width: '100%',
        height: 522,
    },
    bolinha: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#e5e7eb',
        overflow: 'hidden',
        zIndex: 10,
    },
    fotoFuncionario: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#6E6DFF',
        
    },

    // Estilos do modal custom
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)', // fundo escurecido
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#6E6DFF',  // cor personalizada
        padding: 25,
        borderRadius: 12,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        color: '#EEE',
        marginBottom: 20,
        whiteSpace: 'pre-line', // para respeitar quebras de linha no texto
    },
    modalButton: {
        backgroundColor: '#5856D6', // tom mais escuro do roxo para o botão
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
