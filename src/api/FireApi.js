import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import * as app from '../../app.json';

// export async function joinGame(session, name) {
//     const [isLoading, setIsLoading] = useState(false);


//     if (name.length < 1) {
//         console.log('You must enter a name!');
//         setError('You must enter a name!');
//         return;
//     }

//     if (session.length < 4) {
//         console.log('You must enter a proper, 4 character code!');
//         setError('You must enter a proper, 4 character code!');
//         return;
//     }
//     setIsLoading(true);
//     let sessionOpen = await canJoinGame(session);
//     if (sessionOpen) {
//         let ref = firebase.database().ref(`players/${session}`).push({
//             playerName: playerName,
//             playerEmail: playerEmail,
//             role: 'Player'
//         })
//         firebase.database().ref(`game/${session}/waiting/${ref.key}`).set(playerName)
//         console.log(`${name} is joining the game!`),
//         navigation.navigate('Lobby', {
//             session: gameCode,
//             playerName: playerName,
//             playerKey: ref.key 
//         })
//     } else {
//         console.log("Session is not open!"),
//         setIsLoading(false)
//     }
// };

// export async function canJoinGame(session) {
//     console.log('Checking if the game is joinable...');
//     try {
//         let snapshot = await firebase.database().ref(`game`).orderByKey().equalTo(session).once('value');
//         if(snapshot.val() == null) {
//             setError('This game cannot be joined. :(');
//             return false;
//         } 
//         console.log(`Game ${gameCode} found!`);
//         return true;
//     } catch {
//         console.log('Could not check if the game exists. :(');
//         return false;
//     }
// };

