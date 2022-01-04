import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              navigation.replace('Welcome')
              // ...
            } else {
                navigation.canGoBack()&&navigation.popToTop();
              // User is signed out
              // ...
            }
        });
        return unsubscribe
    }, [])
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Enter your password"
                label="Password"
                leftIcon={{ type: 'material', name: 'lock' }}
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button title="sign in"  onPress={signIn} style={styles.button} />
            <Button title="register" style={styles.button} onPress={()=> navigation.navigate('Register')}/>
        </View>
    )
}

export default LoginScreen
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
