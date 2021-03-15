import React from 'react';
import PropTypes from 'prop-types';

import GotService from '../../services/gotService';
import ItemDetails, { Field } from '../itemDetails';

import ErrorMessage from '../errorMessage/';

export default class BooksPage extends React.Component {
    state = {
        error: false
    }

    static propTypes = {
        bookId: PropTypes.string
    }

    componentDidCatch() { this.setState({ error: true }); }

    render() {
        const { error } = this.state;
        const { bookId } = this.props;

        if (error) return <ErrorMessage />;

        return (
            <ItemDetails
                type="book"
                itemId={bookId}
                getData={new GotService().getBook}
            >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="publisher" label="Publisher" />
                <Field field="released" label="Released" />
            </ItemDetails>
        );
    }
}