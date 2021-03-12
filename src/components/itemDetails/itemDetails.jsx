import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
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
        loading: true,
        error: false
    }

    static defaultProps = {
        random: false,
        noSpinner: false
    }

    static propTypes = {
        getData: PropTypes.func,
        type: PropTypes.string,
        children: PropTypes.array
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onDetailsLoaded = (item) => { this.setState({ item, loading: false }); }

    onError = () => { this.setState({ error: true, loading: false }); }

    updateItem() {
        const { itemId, getData, noSpinner } = this.props;

        if (noSpinner) this.setState({ laoding: false });
        if (!itemId) return;

        getData(itemId)
            .then(this.onDetailsLoaded)
            .catch(this.onError);
    }

    render() {
        const { item, loading, error } = this.state;
        const { type, children, random, noSpinner } = this.props;

        let content = null;
        let infoText = noSpinner ? <h4>Please select a {type}</h4> : null;

        const spinner = (loading && !noSpinner) ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        if (item) {
            content = <View item={item} children={children} random={random} />;
            infoText = null;
        }

        return (
            <div className="char-details mb-3 rounded">
                {spinner}
                {infoText}
                {errorMessage}
                {content}
            </div>
        );
    }
}

const View = ({ item, children, random }) => {
    const { name } = item;

    return (
        <>
            <h4>{random ? `Random character: ${name}` : name}</h4>
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