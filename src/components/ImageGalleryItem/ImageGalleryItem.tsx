import React, { MouseEvent, useEffect, useState } from 'react';
import Modal from 'components/Modal';
import { ImageResponse } from 'components/App';

const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  image: { webformatURL, tags, id, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };
  const currentImgClickHandler = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    if (showModal) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [showModal]);

  return (
    <li className={'ImageGalleryItem'}>
      <img
        className={'ImageGalleryItem-image'}
        src={webformatURL}
        alt={tags}
        id={String(id)}
        onClick={currentImgClickHandler}
      />
      {showModal && (
        <Modal handleBackdropClick={handleBackdropClick} imageUrl={largeImageURL} alt={tags} />
      )}
    </li>
  );
};

export default ImageGalleryItem;

type ImageGalleryItemProps = {
  image: ImageResponse;
};
