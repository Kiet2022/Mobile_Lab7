import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Style';

const Login_Page = ({navigation}) => {
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [errortext, setErrortext] = useState('');

    const handleSubmitPress = async () => {
        setErrortext('');
        if (!phone) {
            alert('Please fill email or phone');
            return;
        } else if (!pass) {
            alert('Please fill price');
            return;
        } else {
        await fetch('https://kami-backend-5rs0.onrender.com/auth', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phone: phone,
                password: pass
            })}).then(response => response.json())
            .then(async data => {
                console.log(data);
                await AsyncStorage.setItem('token',data.token);
                await navigation.navigate('HomeScreen');
            }
            ).catch(error => console.error(error));
        }
    }

    return (
        <View style={styles.container_main}>
            <View style={{flex:1}}></View>
            <View style={{flex:2}}>

                <KeyboardAvoidingView enabled>
                    <Text style={styles.title}>KAMI</Text>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={phone =>
                                setPhone(phone)
                            }
                            placeholder="Enter Email or Phone"
                            keyboardType="email-address"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(pass) =>
                                setPass(pass)
                            }
                            placeholder="Enter Password"
                            secureTextEntry={true}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        //onPress={handleSubmitPress}
                        onPress={() => navigation.navigate('HomeScreen')}
                        >
                        <Text style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        </View>
    );
};
export default Login_Page;

