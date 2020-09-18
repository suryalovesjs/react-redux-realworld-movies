import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MovieBannerBasePath } from "site-config";

import "./Banner.scss";
import PropTypes from "prop-types";

const mockImage =
  "http://image.tmdb.org/t/p/w1280/x4UkhIQuHIJyeeOTdcbZ3t3gBSa.jpg";

const Banner = (props) => {
  const {
    background,
    title,
    tagline,
    overview,
    releaseDate,
    hideDescription,
    runtime,
  } = props;
  const imageBackground = MovieBannerBasePath + background;
  return (
    <React.Fragment>
      <div
        className="banner"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0)
          39%, rgba(0,0,0,0)
          41%, rgba(0,0,0,0.65)
          100%), url('${imageBackground || mockImage}'), #1c1c1c`,
          backgroundSize: "100%",
        }}
      >
        <Container className={{ hide: hideDescription }}>
          <Row>
            <Col className="movie-detail" xs={12} md={{ span: 6, offset: 6 }}>
              <h3>
                {title || "title"} <span>({releaseDate | "N/A"})</span>
              </h3>
              {runtime && <p className="runtime">{runtime} mins</p>}
              {tagline && <p className="tagline">{tagline}</p>}
              <p className="overview">{overview || "overview"}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Banner.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
  tagline: PropTypes.string,
  overview: PropTypes.string,
  releaseDate: PropTypes.number,
  hideDescription: PropTypes.string,
  runtime: PropTypes.number,
};

export default React.memo(Banner);
