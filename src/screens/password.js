import { View, Text, TextInput, SafeAreaView, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'

var matched = true

export default function password() {
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const onChangePass = (text) => {
        setPass(text)
    };

    const onChangeConfirmPass = (text) => {
        setConfirmPass(text)

    }

    const chkk = () => {
        if (pass === confirmPass) {
            matched = true
        } else {
            matched = false
        }
    }
    return (
        <SafeAreaView style={styles.parent}>
            <View style={pass === confirmPass ? {...styles.pass,borderColor:'green'} : styles.pass}>
                <TextInput
                    onChangeText={onChangePass}
                />

            </View>
            <View style={pass === confirmPass ? styles.confirmpass : styles.pass}>
                <TextInput
                    onChangeText={onChangeConfirmPass}
                />

            </View>
            <Button
                title='SUBMIT'
                onPress={chkk} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    parent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pass: {
        borderWidth: 1,
        margin: 20,
        borderColor: 'red',
        width: '80%',
        height: '30%'
    },
    confirmpass: {
        borderWidth: 1,
        margin: 20,
        borderColor: 'green',
        width: '80%',
        height: '30%'
    }
})