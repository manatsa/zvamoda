import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import colors from '../../config/Colors';

function AppButton({ title, onPress, color="secondary" }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color] } ]} onPress={onPress}>
            <Text style={styles.text }>{ title}</Text> 
        </TouchableOpacity>  
        
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 65,
        borderRadius: 50,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight:'bold'

    }
})
export default AppButton;