import React, { useRef, useEffect, useState } from 'react';
import { Notify } from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { getImages, PER_PAGE } from 'services/getImages';

import css from './App.module.css';

export const App = () => {
  const [imageList, setImageList] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState({});
  const [isModalShow, setIsModalShow] = useState(false);
  const [isLoaderShow, setIsLoaderShow] = useState(false);
  const [isLoadMoreShow, setIsLoadMoreShow] = useState(false);
  const firstRender = useRef(true);

  const onSubmit = event => {
    const result = event.target.elements.input.value;
    if (result === '') {
      Notify.info(
        `It seems you didn't write enything, please specify what exactly you are looking for`
      );
    } else {
      if (result === query) {
        Notify.info(
          `It seems your query duplicate previous, please write another one`
        );
      } else {
        setQuery(result.toLowerCase());
        setIsLoadMoreShow(false);
        setImageList([]);
        setPage(1);
      }
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const closeModal = () => {
    setIsModalShow(false);
  };

  const onClick = (src, alt) => {
    setIsModalShow(true);
    setLargeImage({ src, alt });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (query !== '') {
      async function fetchImages() {
        setIsLoaderShow(true);
        await getImages(query, page)
          .then(response => {
            const lastPage = Math.ceil(response.totalHits / PER_PAGE);
            if (response.totalHits === 0) {
              Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
              );
              setIsLoadMoreShow(false);
            } else if (lastPage < page && lastPage !== 0) {
              setIsLoadMoreShow(false);
              Notify.info(
                `We're sorry, but you've reached the end of search results.`
              );
            } else {
              setImageList(prev => [...prev, ...response.hits]);
              setIsLoadMoreShow(true);
            }
          })
          .catch(error => console.log(error))
          .finally(() => setIsLoaderShow(false));
      }

      fetchImages();
    }
  }, [query, page]);

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        {imageList && <ImageGallery imageList={imageList} onClick={onClick} />}
        {isLoaderShow && <Loader />}
        {imageList && isLoadMoreShow && <Button onClick={loadMore} />}
        {isModalShow && (
          <Modal
            src={largeImage.src}
            alt={largeImage.alt}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
};
