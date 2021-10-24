import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.images.map((image, index) => {
          return (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              showImageHandle={this.props.showImageHandler(image.largeImageURL)}
              index={index}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
