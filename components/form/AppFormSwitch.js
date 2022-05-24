import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native'
import AppSwitch from '../wrappers/AppSwitch';
import AppText from '../wrappers/AppText';

function AppFormSwitch({ name, label, onValueChange }) {
    const { values, setFieldValue} = useFormikContext();
    return (
        <View style={styles.container}>
            <AppText>{ label }</AppText>
            <AppSwitch style={styles.switch}
                onValueChange={item => setFieldValue(name,item) }
                value={values[name]} 
            />
        </View>
        
    ); 
}

const styles = StyleSheet.create({
    switch: {
        width: 40,
        alignSelf:'flex-end'
    },
    container: {
        width: '100%',
        flexDirection: 'row',
    }
})
export default AppFormSwitch