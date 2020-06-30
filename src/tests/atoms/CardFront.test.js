import React from 'react';
import { cardMessages, cardMessageGenerate } from '../../components/atoms/CardFront';

//INVALID
describe('cardMessageGenerate', () => {
    it('Should never try to index out of bounds', () => {
        expect(cardMessageGenerate()).toBeInstanceOf();
    });
});