import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Button = ({ onPress, icon, title, colors, righticon, disabled, width }) => {
  return (
     <TouchableOpacity onPress={onPress} style={[styles.navButtonContainer,{opacity:disabled ? 0.8: 1, width : width ? width : '48%'}]} disabled={disabled}>
          <LinearGradient 
            colors={disabled ? ["#CCC","#CCC"] : colors} 
            style={styles.navButton}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            {icon}
            <Text style={styles.navButtonText}>{title}</Text>
            {righticon}
          </LinearGradient>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    navButtonContainer: {
        width: '48%',
        borderRadius: 8,
        overflow: 'hidden',
      },
      navButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
      },
      navButtonText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 10,
        fontSize: 15,
      },
})

export default Button