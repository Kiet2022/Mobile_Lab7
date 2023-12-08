import React, { useState, useEffect } from 'react'

import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const TransactionAdd_Page = () => {
    const [data, setData] = useState([]);
    const [customerID, setCustomerID] = useState('');
    const [services, setServices] = useState([])
    const [serviceQuantity, SetServiceQuantity] = useState('');
    const [isLoading, setIsLoading] = useState(true);



    return (
        <View>
            <Text>asfsa</Text>
        </View>
    )
}
export default TransactionAdd_Page;