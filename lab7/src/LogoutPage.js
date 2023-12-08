import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import styles from "./Style";

const Logout_Page = ({ navigation }) => {
    return (
        <View style={styles.container_main}>
            <Text style={styles.title}>SETTING</Text>
            <View style={styles.container_body}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Logout_Page;