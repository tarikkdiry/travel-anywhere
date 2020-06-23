import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
// import { Container} from 'native-base';
import { withFormik } from 'formik';

const AuthForm = (props) => {

    userNameInput = (
        <View style={styles.container}> 
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('userName', text)}
                placeholder='Display Name'
             />
             <Text style={styles.validationText}>{props.errors.userName}</Text>
        </View>
    );

    return (
        <View style={styles.container}> 
            {/* CHECK IF WE ARE SIGNING UP. IF SO, SHOW THE USER NAME OPTION */}
            {props.authMode === 'signup' ? this.userNameInput : null}
            <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('email', text)}
                placeholder='Email'
             />
             <Text style={styles.validationText}>{props.errors.email}</Text>
             <TextInput 
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.form}
                onChangeText={text => props.setFieldValue('password', text)}
                placeholder='Password'
             />
             <Text style={styles.validationText}>{props.errors.password}</Text>
             <Button 
                onPress={() => props.handleSubmit()}
                buttonStyle={styles.button}
                title={props.authMode === 'login' ? 'Login' : 'Create Account'}
             />
             <Button 
                onPress={() => props.switchAuthMode()}
                buttonStyle={styles.button}
                title={props.authMode === 'login' ? 'New? Sign Up!' : 'Back to Login'}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    form: {
        width: 300,
        height: 50,
        borderColor: 'white',
        borderBottomWidth: 1
    },
    validationText: {
        alignItems: 'center',
        color: 'white'
    },
});

export default withFormik({
    mapPropsToValues: () => ({email: '', password: ''}),
    validate: (values, props) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email Required';
        } else if (!values.email) {
            errors.email = 'Email Required';
        }
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid Email Address';
        // }

        if (!values.password) {
            errors.password = 'Password Required';
        } else if (values.password.length < 10) {
            errors.password = 'Password should be at least 10 characters!';
        }
        
        if (props.authMode === 'signup') {
            if (!values.userName) {
                errors.userName = 'Display Name Required'
            } else if (values.userName.length < 5) {
                errors.userName = 'Display Name should be at least 5 characters!';
            }
        }
        return errors;
    },
    handleSubmit: (values, { props }) => {
        props.authMode === 'login' ? props.login(values) : props.signup(values)
    },
})(AuthForm);


// export default AuthForm;