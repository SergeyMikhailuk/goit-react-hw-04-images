import { useEffect, useState } from 'react';

import { fetchImage } from 'api/fetchImage';
import Searchbar, { SearchbarState } from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';

const App = () => {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [imageQuery, setImageQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const onSubmit = ({ search }: SearchbarState) => {
    setImageQuery(search);
    setPageNumber(1);
    setImages([]);
  };

  const onLoadMoreClick = () => {
    setPageNumber(prevState => {
      return prevState + 1;
    });
  };

  useEffect(() => {
    if (!imageQuery || status === 'pending') return;

    fetchImage(imageQuery, pageNumber)
      .then(images => {
        if (images.hits.length === 0) {
          return Promise.reject(new Error(`Cannot find ${imageQuery}`));
        }
        const totalPages = Math.ceil(images.totalHits / 12);

        const requiredHits = images.hits.map(
          ({ id, webformatURL, largeImageURL, tags }: ImageResponse) => {
            return { id, webformatURL, largeImageURL, tags };
          }
        );
        setTotalPages(totalPages);
        setStatus('resolved');
        setError('');
        setImages(prevState => {
          return [...prevState, ...requiredHits];
        });
      })
      .catch(({ ErrorMessage }) => {
        setError(ErrorMessage as string);
        setStatus('rejected');
      });
  }, [imageQuery, pageNumber, status]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {!!images.length && <ImageGallery images={images} />}
      {status === 'pending' && <Loader />}
      {totalPages > pageNumber && !!imageQuery && (
        <Button onClick={onLoadMoreClick}>Load more</Button>
      )}

      {status === 'rejected' && <ErrorMessage error={error} />}
    </>
  );
};

export default App;

export type ImageResponse = {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
};
