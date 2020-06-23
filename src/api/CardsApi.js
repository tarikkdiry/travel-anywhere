import * as firebase from 'firebase';

export function login({ email, password }) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => console.log(value))
}

export function signup({ email, password, displayName }) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
        console.log(userInfo)
        userInfo.user.updateProfile({ displayName: displayName.trim() })
        .then(() => { 

        })
    })
}

export function subscribeToAuthChanges(authStateChanged) {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
        authStateChanged(user);
    })
}

export function signout(onSignedOut) {
    firebase.auth().signOut()
    .then(() => {
        // console.log('Signed out! - API');
        onSignedOut();
    })
}

export function addCard(card, addComplete) {
    firebase.firestore()
    .collection('cards')
    .add({
        title: card.title,
        description: card.description,
        category: card.category
    }).then((data) => addComplete(data))
    .catch((error) => console.log(error));
}

export async function getCard(getCards) {
    var cardList = [];

    var snapshot = await firebase.firestore()
    .collection('cards')
    .orderBy('category')
    .get()

    snapshot.forEach((doc) => {
        cardList.push(doc.data())
    });

    getCards(cardList);
}