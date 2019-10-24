import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  TitleContainer,
  Title,
  Control,
  EditButton,
  Text,
  InfoContainer,
  Info,
} from './styles';
import Button from '~/components/Button';

export default function Description({ history }) {
  const { meetup } = history.location.state;

  return (
    <Container>
      <TitleContainer>
        <Title>{meetup.title}</Title>
        <Control>
          <EditButton>Edit</EditButton>
          <Button>Cancel</Button>
        </Control>
      </TitleContainer>

      <img src={meetup.image.url} alt="meetup banner" />

      <Text>{meetup.description}</Text>

      <InfoContainer>
        <Info>{meetup.parsedDate}</Info>
        <Info>{meetup.location}</Info>
      </InfoContainer>
    </Container>
  );
}

Description.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        meetup: PropTypes.shape({
          title: PropTypes.string,
          image: PropTypes.shape({
            url: PropTypes.string,
          }),
          description: PropTypes.string,
          parsedDate: PropTypes.string,
          location: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
};
