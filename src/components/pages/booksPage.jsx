import React from 'react';
import { withRouter } from 'react-router-dom';

import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';

import gotService from '../../services/gotService';

class BooksPage extends React.Component {
    gotService = new gotService();

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
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => `${name}`}
            />
        );
    }
}

export default withRouter(BooksPage);