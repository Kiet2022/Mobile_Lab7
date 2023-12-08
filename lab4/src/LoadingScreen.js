import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


const Loading = () => {
    return (
        <View style={{alignItems: 'center', alignContent: 'center', padding: 'auto'}}>
        <ActivityIndicator animating={true} color={MD2Colors.red800} size='large'/>
        </View>
    );

};

export default Loading;