import React from 'react';

import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

import gotService from '../../services/gotService';

export default class HousesPage extends React.Component {
    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() { this.setState({ error: true }); }

    onItemSelected = (selectedHouse) => { this.setState({ selectedHouse }); }

    render() {
        const { selectedHouse, error } = this.state;

        if (error) return <ErrorMessage />;

        const houseList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllHouses}
                renderItem={({ name }) => `${name}`}
            />
        );

        const houseDetails = (
            <ItemDetails
                type="house"
                itemId={selectedHouse}
                getData={this.gotService.getHouse}
                noSpinner={true}
            >
                <Field field="region" label="Region" />
                <Field field="words" label="Words" />
                <Field field="titles" label="Titles" />
                <Field field="overlord" label="Overlord" />
            </ItemDetails>
        );

        return <RowBlock left={houseList} right={houseDetails} />;
    }
}