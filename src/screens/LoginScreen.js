import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthForm from '../components/organisms/AuthForm';
// import LoginForm from '../components/organisms/LoginForm';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     //STATES
        //     route: props.route,
        //     navigation: props.navigation,
        //     // AUTH
        //     authMode: 'login'
        // };
    }

    state = {
        authMode: 'login'
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    switchAuthMode = () => {
        this.setState(prevState => ({
            authMode: prevState.authMode === 'login' ? 'signup' : 'login'
        }));
    }

    // FOR AUTH FORM
    /*
    render() {
        return (
            <AuthForm
                authMode={this.state.authMode}
                switchAuthMode={this.switchAuthMode}
            />
        );
    }
    */

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text style={styles.text}>Login</Text> 
                    <View style={styles.authForm}>
                        <AuthForm 
                            authMode={this.state.authMode}
                            switchAuthMode={this.switchAuthMode}
                        />
                    </View>
                    <Button 
                        title="Submit"
                        color="white"
                        onPress={() => {
                            this.props.navigation.push('Welcome', {

                            })
                        }}
                    />
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2884B' 
    },
    authForm: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular'
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10%',
    }, 
    // bottom: {
    //     flex: 1,
    //     backgroundColor: '#F2884B'
    // }
});

export default LoginScreen;