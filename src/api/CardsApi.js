import * as firebase from 'firebase';

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