import React from 'react';
import { Col, Row, Container, Button } from 'reactstrap';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharactersPage from '../pages/charactersPage';
import BooksPage from '../pages/booksPage';
import HousesPage from '../pages/housesPage';

export default class App extends React.Component {
    state = {
        showRandomChar: true,
        error: false
    };

    componentDidCatch() {
        this.setState({ error: true });
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            };
        });
    }

    render() {
        const { showRandomChar, error } = this.state;
        const char = showRandomChar ? <RandomChar /> : null;

        if (error) return <ErrorMessage />;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row className="mb-3">
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <Button
                                color="primary"
                                onClick={this.toggleRandomChar}
                            >Toggle random character</Button>
                        </Col>
                    </Row>
                    <CharactersPage />
                    <BooksPage />
                    <HousesPage />
                </Container>
            </>
        );
    }
}