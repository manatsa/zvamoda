import React from 'react';
import AppText from '../wrappers/AppText';
import { StyleSheet, View } from 'react-native'
import colors from '../../config/Colors'

function AppErrorMessage({message, visible}) {
    return (
        message || visible ?<View style={styles.container}>
            <AppText style={styles.error}> { message} </AppText>
        </View>:null
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        
    },
    error: {
        color: colors.danger,
        fontSize: 14,
        paddingBottom: 20,
        paddingHorizontal: 10
    }
})
export default AppErrorMessage;