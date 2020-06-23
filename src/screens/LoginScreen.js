import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AuthForm from '../components/organisms/AuthForm';

// API
import {login, signup, subscribeToAuthChanges} from '../api/CardsApi';

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

    // _unsubscribe = null;

    state = {
        authMode: 'login'
    }

    componentDidMount() {
        subscribeToAuthChanges(this.onAuthStateChanged);
    }

    componentWillUnmount() {
        // this._unsubscribe()
    }

    onAuthStateChanged = (user) => {
        if (user !== null) {
            this.props.navigation.push('Welcome'); //Might be navigation.navigate
        }
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
                <Text style={styles.text}>Login</Text> 
                <View style={styles.authForm}>
                    <AuthForm 
                        login={login}
                        signup={signup}
                        authMode={this.state.authMode}
                        switchAuthMode={this.switchAuthMode}
                    />
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
        backgroundColor: '#F2884B',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    authForm: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    text: {
        fontSize: 40, 
        color: 'white', 
        fontFamily: 'regular',
        marginLeft: '10%',
        marginTop: '60%',
        paddingBottom: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10%',
    }, 
});

export default LoginScreen;