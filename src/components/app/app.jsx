import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Col, Row, Container, Button } from 'reactstrap';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { BooksItem, BooksPage, CharactersPage, HousesPage } from '../pages';

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
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row className="mb-3">
                            <Col lg={{ size: 6, offset: 0 }}>
                                {char}
                                <Button
                                    color="primary"
                                    onClick={this.toggleRandomChar}
                                >Toggle random character</Button>
                            </Col>
                        </Row>
                        <Route path="/characters" component={CharactersPage} />
                        <Route path="/houses" component={HousesPage} />
                        <Route path="/books" exact component={BooksPage} />
                        <Route path="/books/:bookId" render={
                            ({ match }) => {
                                const { bookId } = match.params;
                                return <BooksItem bookId={bookId} />;
                            }
                        } />
                    </Container>
                </div>
            </Router>
        );
    }
}