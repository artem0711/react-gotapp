import React from 'react';
import PropTypes from 'prop-types';

import ItemDetails, { Field } from '../itemDetails';

import GotService from '../../services/gotService';

import './randomChar.css';

export default class RandomChar extends React.Component {
    state = {
        charId: null
    }

    static defaultProps = {
        interval: 15000
    }

    static propTypes = {
        interval: PropTypes.number
    }

    componentDidMount() {
        const { interval } = this.props;

        this.timerId = setInterval(this.updateChar, interval);
        this.updateChar();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    updateChar = () => {
        const charId = Math.floor(Math.random() * 130 + 20);
        // const id = 9999999999;

        this.setState({ charId });
    }

    render() {
        const { charId } = this.state;

        return (
            <ItemDetails
                type="character"
                itemId={charId}
                random={true}
                getData={new GotService().getCharacter}
            >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        );
    }
}