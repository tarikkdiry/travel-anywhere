import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
// import Button from '../atoms/Button';
// import { Container} from 'native-base';
import { withFormik } from 'formik';

const AuthForm = (props) => {

    // SHOW ONLY IF USER WANTS TO SIGN UP
    userNameInput = (
        <View> 
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('userName', text)}
                placeholder='Username'
             />
             <Text style={styles.errorText}>{props.errors.userName}</Text>
        </View>
    );

    handleSubmitHandler = () => {
        console.log("Submit handled!");
        props.handleSubmit();
    }

    switchAuthModeHandler = () => {
        console.log("Auth switched!");
        props.switchAuthMode();
    }

    return (
        <View style={styles.container}> 
            {/* CHECK IF WE ARE SIGNING UP. IF SO, SHOW THE USER NAME OPTION */}
            {props.authMode === 'Signup' ? this.userNameInput : null}
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('email', text)}
                placeholder='Email'
             />
             <Text style={styles.errorText}>{props.errors.email}</Text>
             <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('password', text)}
                placeholder='Password'
             />
             <Text style={styles.errorText}>{props.errors.password}</Text>
            <View style={styles.buttons}>
                <View style={styles.top}>
                    <Button 
                        type="outline"
                        titleStyle={{color: 'white'}}
                        onPress={() => handleSubmitHandler()}
                        buttonStyle={styles.login}
                        title={props.authMode === 'Login' ? 'Login' : 'Create Account'}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button 
                        type="clear"
                        color="white"
                        titleStyle={{color: 'white'}}
                        onPress={() => switchAuthModeHandler()}
                        title={props.authMode === 'Login' ? 'New? Sign Up!' : 'Back to Login'}
                    />
                </View>
             </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    form: {
        width: 300,
        height: 50,
        borderColor: 'white',
        borderBottomWidth: 1
    },
    errorText: {
        alignItems: 'center',
        color: 'white'
    },
    buttons: {
        flex: 1,
        width: '75%',
    },
    top: {
        flex: 1,
    },
    bottom: {
        flex: 1,
        justifyContent: 'center'
    },
    login: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
        marginTop: 30,
    },
    signup: {
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
    }
});

export default withFormik({
    mapPropsToValues: () => ({
        email: '', 
        password: ''
    }),
    validate: (values, props) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email Required';
        } 
        // else if (!values.email) {
        //     errors.email = 'Email Required';
        // }
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid Email Address';
        // }

        if (!values.password) {
            errors.password = 'Password Required';
        } else if (values.password.length < 10) {
            errors.password = 'Password should be at least 10 characters!';
        }
        
        if (props.authMode === 'Signup') {
            if (!values.userName) {
                errors.userName = 'Username Required'
            } else if (values.userName.length < 5) {
                errors.userName = 'Username should be at least 5 characters!';
            }
        }
        return errors;
    },
    handleSubmit: (values, { props }) => {
        props.authMode === 'Login' ? props.login(values) : props.signup(values)
    },
})(AuthForm);


// export default AuthForm;