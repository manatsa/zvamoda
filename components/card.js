import React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import AppText from './AppText';
import colors from '../constants/ThemeColors'

function Card({title, subTitle, imageSource}) {
    return (
        <View style={styles.card}>
            <Image resizeMode='stretch' source={imageSource} style={styles.image} />
            <View style={styles.detailContainer}>
                 <AppText style={styles.title }>{title}</AppText>
                <AppText style={styles.subTitle }>{ subTitle}</AppText>
            </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        width: '100%',
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: 250,
        paddingBottom:10
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        paddingBottom:5,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.secondary,
        paddingBottom: 10
    },
    detailContainer: {
        paddingHorizontal: 30
    }
})
export default Card;