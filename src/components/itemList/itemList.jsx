import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import './itemList.css';

export default function ItemList({ getData, onItemSelected, renderItem }) {
    const [itemList, updateList] = useState([]);
    const [error, onError] = useState(false);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
            .catch((error) => {
                onError(error);
            });
    }, [getData])

    function renderItems(items) {
        return items.map((item) => {
            const { id } = item;

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

    if (error) return <ErrorMessage />;

    if (itemList.length === 0) return (
        <div className="char-details mb-3 rounded">
            <Spinner />
        </div>
    );

    return (
        <div className="mb-3">
            <ListGroup className="item-list">
                {renderItems(itemList)}
            </ListGroup>
        </div >
    );
}