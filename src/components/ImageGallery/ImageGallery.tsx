import React from 'react';
import { ImageResponse } from 'components/App';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <ul className="ImageGallery">
      {images.map((image, index) => (
        <ImageGalleryItem key={image.id + index} image={image} />
      ))}
    </ul>
  );
};

export default ImageGallery;

type ImageGalleryProps = {
  images: ImageResponse[];
};
