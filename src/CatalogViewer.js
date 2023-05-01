import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, IconButton, Typography } from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  PlayArrow,
  Pause,
} from '@mui/icons-material';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  width: calc(60vw - 20px);
  flex-direction: column;
  margin: 10px;

  .imgs {
    max-width: 100%;
    height: auto;
    border-radius: 30px;
  }

  @media (max-width: 768px) {
    width: 97vw;
  }
`;

const Actions = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 15%;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  opacity: ${({ isActive }) => (isActive ? '1' : '0.5')};
  border-radius: 10px;

  &:hover {
    opacity: 1;
  }
`;

const DescriptionWrapper = styled.div`
  width: 40vw
  display: flex;
  

  p{
    align-items: center;
    text-align:justify; 
    padding:0px 30px;
    line-height: 1.6;
    width: 40vw;
    font-family: inherit;
  }

  @media (max-width: 768px) {

    p{
      width: 94vw;
    }
    
  }
`;

const CatalogViewer = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(currentImage);
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentImage(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImage);
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentImage(images[nextIndex]);
  };

  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  useEffect(() => {
    let intervalId;

    if (playing) {
      intervalId = setInterval(() => {
        const currentIndex = images.indexOf(currentImage);
        const nextIndex =
          currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentImage(images[nextIndex]);
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [currentImage, images, playing]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container>
          <ImageWrapper>
            <img
              className="imgs"
              src={currentImage.url}
              alt={currentImage.description}
            />
            <Actions>
              <IconButton onClick={handlePrev}>
                <ChevronLeft />
              </IconButton>
              {playing ? (
                <IconButton onClick={handlePause}>
                  <Pause />
                </IconButton>
              ) : (
                <IconButton onClick={handlePlay}>
                  <PlayArrow />
                </IconButton>
              )}
              <IconButton onClick={handleNext}>
                <ChevronRight />
              </IconButton>
            </Actions>
            <ThumbnailWrapper>
              {images.map((image) => (
                <Thumbnail
                  key={image.id}
                  src={image.url}
                  alt={image.description}
                  isActive={image.id === currentImage.id}
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </ThumbnailWrapper>
          </ImageWrapper>

          <DescriptionWrapper>
            <Typography variant="h5" component="h2">
              {currentImage.title}
            </Typography>
            <p>{currentImage.description}</p>
          </DescriptionWrapper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default CatalogViewer;
