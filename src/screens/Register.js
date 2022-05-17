import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const icLoginBg = './assets/images/icLoginBg.png'
const icVisible = './assets/images/icVisible.png'
const uncheck = require('./assets/images/unchecked-circle.png')
const check = require('./assets/images/checked.png')
const viewPassButton = require('./assets/images/show.png')
const hidePassButton = require('./assets/images/hide.png')
const viewConfirmPassButton = require('./assets/images/show.png')
const hideConfirmPassButton = require('./assets/images/hide.png')

export default function Register() {
    const [passVisibile, setPassVisible] = useState(true)
    const [confirmPassVisibile, setConfirmPassVisible] = useState(true)
    const [chk, setChk] = useState(true)
    const [viewPass, setViewPass] = useState(false)
    const [viewConfirmPass, setViewConfirmPass] = useState(false)


    const [passButton, setPassButton] = useState(hidePassButton)
    const [confirmPassButton, setConfirmPassButton] = useState(hideConfirmPassButton)
    const [checkButton, setCheckButton] = useState(require('./assets/images/unchecked-circle.png'))
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const [nameError, setNameError] = useState('')
    const [confirmPassError, setConfirmPassError] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const regexEmail = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
    const regexPass = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$'
    const nameRegex = '^[a-zA-Z\s]+$'

    const passViewButtonHandler = () => {
        setPassVisible(!passVisibile)
        setViewPass(!viewPass)
        setPassButton(viewPass === false ? viewPassButton : hidePassButton)

    }
    const checkButtonHandler = () => {
        setChk(!chk)
        setCheckButton(chk === true ? check : uncheck)
    }

    const confirmPassViewButtonHandler = () => {
        setConfirmPassVisible(!confirmPassVisibile)
        setViewConfirmPass(!viewConfirmPass)
        setConfirmPassButton(viewConfirmPass === false ? viewConfirmPassButton : hideConfirmPassButton)
    }

    const isEmailValid = () => {
        if (!email.match(regexEmail)) {
            setEmailError('Enter valid email')
        }
        else {
            setEmailError('')
        }
    }
    const isNameValid = () => {
        if (!name.match(nameRegex) || name[0] == ' ') {
            setNameError('Enter valid name')
        }
        else {
            setNameError('')
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

    const isConfirmPassValid = () => {
        if (pass != confirmPass) {
            setConfirmPassError('Passwords did not match')
        }
        else {
            setConfirmPassError('')
        }
    }

    const registerButtonHandler = () => {
        isNameValid()
        isEmailValid()
        isPassValid()
        isConfirmPassValid()
    }


    const onChangeEmail = (text) => {
        setEmail(text)
    }

    const onChangeName = (text) => {
        setName(text)

        if (!name.match(nameRegex) && name[0] == ' ') {
            setNameError('Enter valid name')
        }
        else {
            setNameError('')
        }
    }

    const onChangePass = (text) => {
        setPass(text)
    }

    const onChangeConfirmPass = (text) => {
        if (pass === text) {
            setConfirmPassError('')
        }
        setConfirmPass(text)


    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 10 }}>
            <View style={styles.parent}>
                <Image
                    source={require(icLoginBg)}
                />
                <Text style={styles.heading}>
                    {"Register"}
                </Text>
                <Text style={styles.text}>
                    {"Enter your details to continue"}
                </Text>
                <View style={styles.textInputView}>
                    {name.length > 0 && <Text style={styles.label}>
                        {"Name"}
                    </Text>}
                    <TextInput
                        placeholder='Name'
                        onChangeText={onChangeName}
                        onBlur={isNameValid}
                    />

                </View>
                <Text style={styles.errorMsg}>
                    {nameError}
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
                <View style={styles.textInputView}>
                    <Text style={styles.label}>
                        {confirmPass.length ? "Confirm Password" : ''}
                    </Text>
                    <View style={styles.passView}>
                        <TextInput
                            placeholder='Confirm Password'
                            style={styles.textInput}
                            secureTextEntry={confirmPassVisibile}
                            onChangeText={onChangeConfirmPass}
                            onBlur={isConfirmPassValid}

                        />
                        <TouchableOpacity onPress={confirmPassViewButtonHandler}>
                            <Image
                                source={confirmPassButton}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.errorMsg}>
                    {confirmPassError}
                </Text>
                <View style={styles.agree}>
                    <TouchableOpacity onPress={checkButtonHandler}>
                        <Image
                            style={styles.agreeicon}
                            source={checkButton}
                        />
                    </TouchableOpacity>

                    <Text>
                        {'Agree to Terms of Service & Privacy Policy'}
                    </Text>
                </View>
                <View style={styles.loginButtonView}>
                    <Button
                        title='REGISTER'
                        color={'black'}
                        onPress={registerButtonHandler}
                    />
                </View>
                <Text style={styles.register}>
                    {'Already have an account? '}
                    <Text style={styles.registerText}>
                        {"Login"}
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
        marginBottom: 10
    },
    textInputView: {
        borderWidth: 1,
        marginLeft: 30,
        marginRight: 30,
        padding: 16,
        borderColor: 'lightgrey',
        borderRadius: 10,
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
    agreeicon: {
        height: 20,
        width: 20,
        marginRight: 10

    },
    loginButtonView: {
        backgroundColor: '#fee7a4',
        margin: 10,
        padding: 10,
        borderRadius: 5
    },
    register: {
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 10
    },
    errorMsg: {
        color: 'red',
        marginTop: 10,
        fontSize: 12,
        marginLeft: 35,
        marginBottom: 5
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
        paddingRight: 40
    },
    agree: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})