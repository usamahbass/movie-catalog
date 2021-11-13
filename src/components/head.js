import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>{title ?? ""} - Movie Catalog</title>
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string,
};

export default Head;
