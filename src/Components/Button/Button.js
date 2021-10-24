import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    return (
      <button
        type="Button"
        className="Button"
        onClick={this.props.loadMoreHandler}
      >
        Load more
      </button>
    );
  }
}

Button.propType = {
  loadMoreHandler: PropTypes.func.isRequired,
};

export default Button;
