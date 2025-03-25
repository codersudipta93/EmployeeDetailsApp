import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { getData, deleteSingleData } from '../storage/asyncStorageHelper';
import Header from '../components/Header';
import Button from '../components/Button';

const SeeDetails = props => {
    const navigation = useNavigation();

    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const usrDetails = await getData('userDetails');
                if (usrDetails) {
                    setDetails(JSON.parse(usrDetails));
                } else {
                    setDetails(null);
                }
            } catch (error) {
                console.error("Error fetching details:", error);
                setDetails(null);
            }
            setLoading(false);
        };
        fetchDetails();
    }, []);

    const handleEditDetails = () => {
        // Navigate to edit screen or open edit modal
        props.navigation.navigate('AddDetails', { details });
    };

    const handleDeleteDetails = async () => {
        Alert.alert(
            'Delete User Details',
            'Are you sure you want to delete your user details?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteSingleData('userDetails');
                            setDetails(null);
                            // props.navigation.navigate('Home'); // Navigate to home or signup
                        } catch (error) {
                            console.error("Error deleting details:", error);
                            Alert.alert('Error', 'Could not delete user details');
                        }
                    },
                },
            ]
        );
    };

    const renderDetailItem = (iconName, label, value, iconColor) => (
        <View style={styles.detailRow}>
            <Ionicons name={iconName} size={26} color={iconColor} />
            <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>{label}</Text>
                <Text style={styles.detailText}>{value || "N/A"}</Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <LinearGradient
                colors={["#6a11cb", "#2575fc"]}
                style={styles.gradient}
            >
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#FFD700" />
                    <Text style={styles.loadingText}>Fetching details...</Text>
                </View>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={["#6a11cb", "#2575fc"]}
            style={styles.gradient}
        >
            <Header title="Employee Details" backAction={() => { details ? navigation.goBack() : navigation.navigate('Dashboard') }} />
            <SafeAreaView style={styles.container}>
                {details ? (
                    <View style={styles.card}>
                        <Text style={styles.heading}>User Details</Text>
                        <>
                            {renderDetailItem(
                                "qr-code-outline",
                                "QR Code",
                                details.qrCode,
                                "#000"
                            )}
                            {renderDetailItem(
                                "location-outline",
                                "City",
                                details.city,
                                "#000"
                            )}
                            {renderDetailItem(
                                "person-outline",
                                "Name",
                                details.name,
                                "#000"
                            )}

                            {/* Action Buttons */}
                            
                            <View style={styles.navigationContainer}>
                                <Button
                                    onPress={handleEditDetails}
                                    icon={<Ionicons name="create-outline" size={22} color="white" />}
                                    title="Edit"
                                    colors={['#ab7e03', '#ab7e03']}
                                    disabled={false}
                                />

                                <Button
                                    onPress={handleDeleteDetails}
                                    icon={<Ionicons name="trash-outline" size={22} color="white" />}
                                    title="Delete"
                                    colors={['#750e23', '#750e23']}
                                    disabled={false}
                                />
                            </View>

                        </>
                    </View>
                ) : (
                    <>
                        <Text style={styles.errorText}>No details found.</Text>
                    </>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "95%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 20,
        borderRadius: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)",
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#FFFFFF",
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        padding: 15,
        marginVertical: 8,
        borderRadius: 15,
        width: "100%",
    },
    detailContent: {
        marginLeft: 15,
        flex: 1,
    },
    detailLabel: {
        fontSize: 14,
        color: "#000",
        marginBottom: 4,
    },
    detailText: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "600",
    },
    errorText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#FFD700",
    },

    navigationContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reloadBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '35%', backgroundColor: '#faf2b4', borderRadius: 8, paddingVertical: 4 }

});

export default SeeDetails;