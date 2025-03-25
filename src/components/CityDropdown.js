import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    useWindowDimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CITY_DATA } from "../utils/city";

const CityDropdown = ({
    selectedCity,
    setSelectedCity,
    onCitySelect,
    style
}) => {

    const { width, height } = useWindowDimensions();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState(CITY_DATA);
    const [modalVisible, setModalVisible] = useState(false);

    // Search Function
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const filtered = CITY_DATA.filter((item) =>
                item.city.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(CITY_DATA);
        }
    };

    // Select City Function
    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setModalVisible(false);
        if (onCitySelect) {
            onCitySelect(city);
        }
    };

    // Responsive styles
    const responsiveStyles = StyleSheet.create({
        dropdown: {
            // width: width * 0.8,
            //maxWidth: 500,
            padding: Math.min(12, width * 0.03),
            borderRadius: 10,
            height: Math.min(50, height * 0.07)
        },
        dropdownText: {
            fontSize: Math.min(16, width * 0.04),
        },
        modalContent: {
            width: width * 0.9,
            maxWidth: 500,
            maxHeight: height * 0.6,
            borderRadius: 20,
            padding: Math.min(20, width * 0.05),
        },
        searchInput: {
            padding: Math.min(12, width * 0.03),
            fontSize: Math.min(16, width * 0.04),
            borderRadius: 10,
        },
        cityItem: {
            padding: Math.min(15, width * 0.04),
        },
        cityText: {
            fontSize: Math.min(16, width * 0.04),
        },
        closeButton: {
            padding: Math.min(12, width * 0.03),
            borderRadius: 8,
            width: width * 0.3,
        },
    });


    return (
        <View style={[styles.container, style]}>
            {/* Touchable Dropdown to Open Modal */}
            <TouchableOpacity
                style={[styles.dropdown, responsiveStyles.dropdown]}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.dropdownContent}>
                    <Ionicons
                        name="location-outline"
                        size={20}
                        color="#6A11CB"
                        style={styles.icon}
                    />

                    {selectedCity ?
                        <Text style={[styles.dropdownText, responsiveStyles.dropdownText]}>
                            {selectedCity}
                        </Text>
                        :
                        <Text style={[styles.dropdownText, responsiveStyles.dropdownText, styles.placeholderText]}>
                            Select
                        </Text>
                    }
                    <Ionicons
                        name="chevron-down"
                        size={20}
                        color="#6A11CB"
                    />
                </View>
            </TouchableOpacity>

            {/* Modal for Searchable Dropdown */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.modalContainer}
                        >
                            <View
                                style={[
                                    styles.modalContent,
                                    responsiveStyles.modalContent
                                ]}
                            >
                                {/* Search Input */}
                                <View style={styles.searchContainer}>
                                    <Ionicons
                                        name="search"
                                        size={20}
                                        color="#888"
                                        style={styles.searchIcon}
                                    />
                                    <TextInput
                                        style={[
                                            styles.searchInput,
                                            responsiveStyles.searchInput
                                        ]}
                                        placeholder="Search City..."
                                        placeholderTextColor="#888"
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                    />
                                </View>

                                {/* City List */}
                                <FlatList
                                    data={filteredCities}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.cityItem,
                                                responsiveStyles.cityItem,
                                                selectedCity === item.city && styles.selectedItem
                                            ]}
                                            onPress={() => handleCitySelect(item.city)}
                                        >
                                            <Text
                                                style={[
                                                    styles.cityText,
                                                    responsiveStyles.cityText,
                                                    selectedCity === item.city && styles.selectedText
                                                ]}
                                            >
                                                {item.city} ({item.state})
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    maxToRenderPerBatch={10}
                                    initialNumToRender={10}
                                    removeClippedSubviews={true}
                                    keyboardShouldPersistTaps="handled"
                                    ListEmptyComponent={
                                        <View style={styles.emptyContainer}>
                                            <Text style={styles.emptyText}>No cities found</Text>
                                        </View>
                                    }
                                />

                                {/* Close Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.closeButton,
                                        responsiveStyles.closeButton
                                    ]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default CityDropdown;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    dropdownContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#E0E0E0",
        backgroundColor: "#F9F9F9",
        borderRadius: 10,

    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    dropdownText: {
        flex: 1,
        color: "#333",
    },
    placeholderText: {
        color: "#888",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: "#F9F9F9",
    },
    searchIcon: {
        marginLeft: 10,
        marginRight:4,
    },
    searchInput: {
        flex: 1,
        color: "#333",
    },
    cityItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    selectedItem: {
        backgroundColor: "rgba(37, 117, 252, 0.1)",
    },
    selectedText: {
        color: "#2575FC",
        fontWeight: "600",
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        color: "#888",
        fontSize: 16,
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: "#ff2643",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        //marginBottom: 10,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});