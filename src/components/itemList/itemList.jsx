import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import gotService from '../../services/gotService';

import './itemList.css';

export default class ItemList extends React.Component {
    gotService = new gotService();

    state = {
        itemList: null,
        loading: true,
        error: false
    }

    onItemLoaded = (itemList) => { this.setState({ itemList, loading: false }); }

    onError = () => { this.setState({ loading: false, error: true }); }

    componentDidMount() {
        const { getData } = this.props;

        getData()
            .then(this.onItemLoaded)
            .catch(this.onError);
    }

    renderItems(items) {
        return items.map((item) => {
            const { id } = item;
            const { renderItem, onItemSelected } = this.props;

            return (
                <ListGroupItem
                    key={id}
                    onClick={() => onItemSelected(id)}
                >
                    {renderItem(item)}
                </ListGroupItem>
            );
        });
    }

    render() {
        const { itemList, loading, error } = this.state;
        let classes = null;

        classes = loading ? 'list-group-item' : '';
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <ListGroup className="item-list">{this.renderItems(itemList)}</ListGroup> : null;

        return (
            <div className={classes}>
                {errorMessage}
                {spinner}
                {content}
            </div >
        );
    }
}