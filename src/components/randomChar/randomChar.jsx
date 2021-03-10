import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import gotService from '../../services/gotService';

import './randomChar.css';

export default class RandomChar extends React.Component {
    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.timerId = setInterval(this.updateChar, 1500);
        this.updateChar();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { this.setState({ char, loading: false }); }

    onError = () => { this.setState({ loading: false, error: true }); }

    updateChar = () => {
        const id = Math.floor(Math.random() * 130 + 20);
        // const id = 9999999999;

        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;

        return (
            <div className="random-block rounded mb-3">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span>{gender}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Born</span>
                    <span>{born}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Died</span>
                    <span>{died}</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between">
                    <span className="term">Culture</span>
                    <span>{culture}</span>
                </ListGroupItem>
            </ListGroup>
        </>
    );
}