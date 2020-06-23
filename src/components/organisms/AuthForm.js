import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
// import { Container} from 'native-base';
import { withFormik } from 'formik';

const AuthForm = (props) => {

    displayNameInput = (
        <View style={styles.container}> 
            <TextInput 
                style={styles.form}
                onChangeText={text => props.setFieldValue('displayName', text)}
                placeholder='Display Name'
             />
             <Text style={styles.validationText}>{props.errors.displayName}</Text>
        </View>
    );

    return (
        <View style={styles.container}> 
            {props.authMode === 'signup' ? this.displayNameInput : null}
            <TextInput 
                style={styles.form}
                onChangeText={text => props.setFieldValue('email', text)}
                placeholder='Email'
             />
             <Text style={styles.validationText}>{props.errors.email}</Text>
             <TextInput 
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
                title={props.authMode === 'login' ? 'Sign Up' : 'Login'}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center'
        
    },
    form: {
        width: 300,
        height: 50,
        borderColor: 'white',
        borderBottomWidth: 1
    },
    validationText: {
        alignItems: 'center'
    }
});

export default withFormik({
    mapPropsToValues: () => ({email: '', password: ''}),
    validate: (values, props) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email Required';
        } else if (!values.email) {
            errors.email = 'Email Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid Email Address';
        }

        if (!values.password) {
            errors.password = 'Password Required';
        } else if (values.password.length < 10) {
            errors.password = 'Password should be at least 10 characters!';
        }
        
        if (props.authMode === 'signup') {
            if (!values.displayName) {
                errors.displayName = 'Display Name Required'
            } else if (values.displayName.length < 5) {
                errors.displayName = 'Display Name should be at least 5 characters!';
            }
        }

        return errors;
    },
    handleSubmit: (values, { props }) => {
        props.authMode === 'login' ? props.login(values) : props.signup(values)
    },
})(AuthForm);


// export default AuthForm;