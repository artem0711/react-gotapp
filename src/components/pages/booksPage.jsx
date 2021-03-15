import React from 'react';
import { withRouter } from 'react-router-dom';

import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';

import GotService from '../../services/gotService';

class BooksPage extends React.Component {
    state = {
        error: false
    }

    componentDidCatch() { this.setState({ error: true }); }

    render() {
        const { error } = this.state;

        if (error) return <ErrorMessage />;

        return (
            <ItemList
                onItemSelected={(bookId) => { this.props.history.push(bookId); }}
                getData={new GotService().getAllBooks}
                renderItem={({ name }) => `${name}`}
            />
        );
    }
}

export default withRouter(BooksPage);