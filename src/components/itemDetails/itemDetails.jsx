import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import ErrorMessage from '../errorMessage';

import gotService from '../../services/gotService';

import './itemDetails.css';

export const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    );
}

export default class ItemDetails extends React.Component {
    gotService = new gotService();

    state = {
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onDetailsLoaded = (item) => { this.setState({ item }); }

    onError = () => { this.setState({ error: true }); }

    updateItem() {
        const { itemId, getData } = this.props;

        if (!itemId) return;

        getData(itemId)
            .then(this.onDetailsLoaded)
            .catch(this.onError);
    }

    render() {
        const { item, error } = this.state;
        const { type, children } = this.props;

        if (!item && !error) return <span className="select-error">Please a select {type}</span>;

        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !error ? <View item={item} children={children} /> : null;

        return (
            <div className="char-details rounded">
                {errorMessage}
                {content}
            </div>
        );
    }
}

const View = ({ item, children }) => {
    const { name } = item;

    return (
        <>
            <h4>{name}</h4>
            <ListGroup flush>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item });
                    })
                }
            </ListGroup>
        </>
    );
}