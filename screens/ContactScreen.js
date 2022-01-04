import React, {useState} from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { auth, db,} from '../firebase';

const ContactScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageURL, setImageUrl] = useState('');
    const [phone, setPhone] = useState('');
    const update = () => {
            db.collection(auth.currentUser.uid).add({
                name: name,
                phone:phone,
                email:email,
                photo:imageURL
            }).then(() => {
                setName("");
                setEmail("");
                setPhone("");
                setImageUrl("");
                alert("The new contact detail is added!!!!");
                navigation.replace('Welcome');
                
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });        
    }
    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter your name"
                label="Name"
                leftIcon={{ type: 'material', name: 'badge' }}
                value={name}
                onChangeText={text => setName(text)}
            />
            <Input
                placeholder="Enter your email"
                label="Email"
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Input
                placeholder="Enter your Phone Number"
                label="Phone Number"
                leftIcon={{ type: 'material', name: 'phone' }}
                value={phone}
                onChangeText={text => setPhone(text)}
            />
            <Input
                placeholder="Enter your image Url"
                label="Profile Picture"
                leftIcon={{ type: 'material', name: 'face' }}
                value={imageURL}
                onChangeText={text => setImageUrl(text)}
            />

            <Button title="Update" onPress={update} style={styles.button} />
        </View>
    )
}

export default ContactScreen
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