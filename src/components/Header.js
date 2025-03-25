import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';


const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View>
            <View style={[styles.header,{paddingVertical: props.hideBack ? 17:10,}]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={props.backAction}
                >
                  {!props.hideBack ? <Ionicons name="arrow-back" size={22} color="white" /> : null}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{props?.title}</Text>
                <View style={styles.headerPlaceholder} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(0,0,0,0.1)',
},
backButton: {
    padding: 10,
},
headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
},
headerPlaceholder: {
    width: 44, // Match back button width to center the title
},
})

export default Header