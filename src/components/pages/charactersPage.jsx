import React from 'react';

import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

import gotService from '../../services/gotService';

export default class CharactersPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() { this.setState({ error: true }); }

    onItemSelected = (selectedChar) => { this.setState({ selectedChar }); }

    render() {
        const { selectedChar, error } = this.state;

        if (error) return <ErrorMessage />;

        const charList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        );

        const charDetails = (
            <ItemDetails
                type="character"
                itemId={selectedChar}
                getData={this.gotService.getCharacter}
                noSpinner={true}
            >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        );

        return <RowBlock left={charList} right={charDetails} />;
    }
}