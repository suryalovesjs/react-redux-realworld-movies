import React from "react";
import { Col, Form, FormControl, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { peekSearchMovies } from "store/actions/movies";
import { DebounceInput } from "react-debounce-input";
import { selectMovieStore } from "store/dispatchers";
import { MdMovieCreation } from "react-icons/md";

const DEFAULT_SEARCH = "popular";

class MainNavBar extends React.Component {
  searchMovies = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const dispatchValue = event.target.value || DEFAULT_SEARCH;

    dispatch(selectMovieStore(dispatchValue));
    dispatch(peekSearchMovies(dispatchValue));
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Row className="w-100">
            <Col>
              <Navbar.Brand href="/">
                <MdMovieCreation /> All about movies !!
              </Navbar.Brand>
            </Col>
            <Col xs={6}>
              <Form inline>
                <FormControl
                  as={DebounceInput}
                  type="text"
                  placeholder="Search Movies..."
                  debounceTimeout={1000}
                  className="mr-sm-2 w-100"
                  onChange={this.searchMovies}
                />
              </Form>
            </Col>
          </Row>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default connect()(MainNavBar);
