import React from 'react';

import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import RowBlock from '../../rowBlock';

import gotService from '../../../services/gotService';

export default class BooksPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch() { this.setState({ error: true }); }

    onItemSelected = (selectedBook) => { this.setState({ selectedBook }); }

    render() {
        const { selectedBook, error } = this.state;

        if (error) return <ErrorMessage />;

        const bookList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => `${name}`}
            />
        );

        const bookDetails = (
            <ItemDetails
                type="book"
                itemId={selectedBook}
                getData={this.gotService.getBook}
            >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        );

        return <RowBlock left={bookList} right={bookDetails} />;
    }
}