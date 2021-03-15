import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemDetails.css';

export const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </ListGroupItem>
    );
}

export default function ItemDetails({ getData, random = false, noSpinner = false, itemId, type, children }) {
    const [item, updateItem] = useState([]);
    const [error, onError] = useState(false);

    useEffect(() => {
        if (!itemId) return;

        getData(itemId)
            .then((item) => {
                updateItem(item);
            })
            .catch((error) => {
                onError(error);
            });
    }, [getData, itemId])

    if (error) return <ErrorMessage />;

    let content = null;
    let infoText = noSpinner ? <h4>Please select a {type}</h4> : null;

    const spinner = (item.length === 0 && !noSpinner) ? <Spinner /> : null;

    if (item.length !== 0) {
        content = <View item={item} children={children} random={random} />;
        infoText = null;
    }

    return (
        <div className="char-details mb-3 rounded">
            {spinner}
            {infoText}
            {content}
        </div>
    );
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