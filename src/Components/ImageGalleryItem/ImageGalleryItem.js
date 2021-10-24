import { Component } from 'react';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={this.props.showImageHandle}
        />
      </li>
    );
  }
}

ImageGalleryItem.propType = {
  img: PropTypes.string.isRequired,
  showImageHandle: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
