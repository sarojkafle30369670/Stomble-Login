import { auth } from '../firebase';
import React, { useLayoutEffect }from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';


const WelcomeScreen = ({navigation}) => {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={signOut}
                >
                    <Entypo name="log-out" size={24} color="black" />
                </TouchableOpacity>
            )
        })

    }, [])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View>
            <Text>Welcome {auth?.currentUser?.displayName}</Text>
            <Button title="Add New Contact"  onPress={()=>navigation.navigate('Contact')} style={styles.button} />
        </View>
    )
}

export default WelcomeScreen
const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    }
})

