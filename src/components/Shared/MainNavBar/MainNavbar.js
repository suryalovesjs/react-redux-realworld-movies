// External Dependencies
import React from "react";
import { Col, Form, FormControl, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { MdMovieCreation } from "react-icons/md";
import { withRouter } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

// Internal Dependencies
import { peekSearchMovies, peekMovies } from "store/actions";
import { selectMovieStore } from "store/dispatchers";

const DEFAULT_SEARCH = "popular";

class MainNavBar extends React.Component {
  searchMovies = (event) => {
    event.preventDefault();
    const {
      dispatch,
      match: { path },
    } = this.props;
    if (event.target.value) {
      dispatch(selectMovieStore(event.target.value));
      dispatch(peekSearchMovies(event.target.value));

      if (path !== "") {
        this.goToHome();
      }
    } else {
      dispatch(selectMovieStore(DEFAULT_SEARCH));
      dispatch(peekMovies(DEFAULT_SEARCH));
    }
  };

  goToHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Row className="w-100">
            <Col>
              <Navbar.Brand onClick={this.goToHome}>
                <h4>
                  <MdMovieCreation />
                </h4>
              </Navbar.Brand>
            </Col>
            <Col xs={4}>
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

export default React.memo(withRouter(connect()(MainNavBar)));
