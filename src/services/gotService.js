export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }
    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter(res));
    }

    async getCharacter(charId) {
        const res = await this.getResource(`/characters/${charId}`);
        return this._transformCharacter(res);
    }

    async getAllBooks() {
        const res = await this.getResource('/books?page=5&pageSize=10');
        return res.map(this._transformBook(res));
    }

    async getBook(bookId) {
        const res = await this.getResource(`/books/${bookId}`);
        return this._transformBook(res);
    }

    async getAllHouses() {
        const res = await this.getResource('/houses?page=5&pageSize=10');
        return res.map(this._transformHouse(res));
    }

    async getHouse(houseId) {
        const res = await this.getResource(`/houses/${houseId}`);
        return this._transformHouse(res);
    }

    _transformCharacter(char) {
        return {
            name: char.name ? char.name : 'no data :(',
            gender: char.gender ? char.gender : 'no data :(',
            born: char.born ? char.born : 'no data :(',
            died: char.died ? char.died : 'no data :(',
            culture: char.culture ? char.culture : 'no data :('
        };
    }

    _transformBook(book) {
        return {
            name: book.name ? book.name : 'no data :(',
            numberOfPages: book.numberOfPages ? book.numberOfPages : 'no data :(',
            publiser: book.publiser ? book.publiser : 'no data :(',
            released: book.released ? book.released : 'no data :('
        };
    }

    _transformHouse(house) {
        return {
            name: house.name ? house.name : 'no data :(',
            region: house.region ? house.region : 'no data :(',
            words: house.words ? house.words : 'no data :(',
            titles: house.titles ? house.titles : 'no data :(',
            overlord: house.overlord ? house.overlord : 'no data :(',
            ancestralWeapons: house.ancestralWeapons ? house.ancestralWeapons : 'no data :('
        };
    }
}