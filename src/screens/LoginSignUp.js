import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const icLoginBg = './assets/images/icLoginBg.png'
const icVisible = './assets/images/icVisible.png'
const icCheck = './assets/images/icCheck.png'
const viewPassButton = require('./assets/images/show.png')
const hidePassButton = require('./assets/images/hide.png')

export default function LoginSignUp() {
    const [passVisibile, setPassVisible] = useState(true)
    const [viewPass, setViewPass] = useState(false)
    const [emailText, setmailText] = useState(false)
    const [passButton, setPassButton] = useState(hidePassButton)
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const regexEmail = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
    const regexPass = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
    const passViewButtonHandler = () => {
        setPassVisible(!passVisibile)
        setViewPass(!viewPass)
        setPassButton(viewPass === false ? viewPassButton : hidePassButton)
    }

    const isEmailValid = () => {
        if (!email.match(regexEmail)) {
            setEmailError('Enter valid email')
        }
        else{
            setEmailError('')
        }
    }


    const isPassValid = () => {
        if (!pass.match(regexPass)) {
            setPassError('Enter valid password')
        }
        else {
            setPassError('')
        }
    }
    

    const onChangeEmail = (text) => {
        setEmail(text)
    }

    const onChangePass = (text) => {
        setPass(text)
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <View style={styles.parent}>
                <Image
                    source={require(icLoginBg)}
                />
                <Text style={styles.heading}>
                    {"Login"}
                </Text>
                <Text style={styles.text}>
                    {"Enter your details to continue"}
                </Text>
                
                <View style={styles.textInputView}>
                <Text style={styles.label}>
                    {email.length ? "Email" : ''}
                </Text>
                    <TextInput
                        placeholder='Email'
                        onChangeText={onChangeEmail}
                        onBlur={isEmailValid}
                    />

                </View>
                <Text style={styles.errorMsg}>
                    {emailError}
                </Text>
                <View style={styles.textInputView}>
                <Text style={styles.label}>
                    {pass.length ? "Password" : ''}
                </Text>
                    <View style={styles.passView}>
                    <TextInput
                    placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry={passVisibile}
                        onChangeText={onChangePass}
                        onBlur={isPassValid} 
                    />
                    </View>
                    <TouchableOpacity onPress={passViewButtonHandler}>
                        <Image
                            source={passButton}
                            style={styles.icon}
                        />
                    </TouchableOpacity>

                </View>
                <Text style={styles.errorMsg}>
                    {passError}
                </Text>
                <Text
                    onPress={() => Alert.alert("try remembering it then...")}
                    style={[styles.text, { alignSelf: 'flex-end', marginTop: 20 }]}>
                    {"Forgot Password?"}
                </Text>
                <View style={styles.loginButtonView}>
                    <Button
                        title='LOGIN'
                        color={'black'}
                        // onPress={loginButtonHandler}
                    />
                </View>
                <Text style={styles.register}>
                    {'Already Have An Account? '}
                    <Text style={styles.registerText}>
                        {"Register"}
                    </Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    parent: {
        flex: 1,
        borderColor: 'grey',
        margin: 5,
        justifyContent: 'space-between'
    },
    heading: {
        position: 'absolute',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#282828',
        letterSpacing: 1,
        top: 150,
        left: 30
    },
    text: {
        fontSize: 15,
        color: 'grey',
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
    },
    textInputView: {
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        padding: 16,
        borderColor: 'lightgrey',
        borderRadius: 10
    },
    textInput: {
        fontSize: 15,
    },
    icon: {
        height: 20,
        width: 20,
        position: 'absolute',
        left: 260,
        bottom: 10
    },
    loginButtonView: {
        backgroundColor: '#fee7a4',
        margin: 30,
        padding: 10,
        borderRadius: 5
    },
    register: {
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 40
    },
    errorMsg: {
        color: 'red',
        marginTop: 10,
        fontSize: 12,
        marginLeft: 35
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10
    },
    registerText: {
        fontWeight: 'bold'
    },
    passView: {
        paddingRight:40
    }
})