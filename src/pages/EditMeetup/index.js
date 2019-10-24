import React from 'react';

import { Container } from './styles';
import ImageInput from '~/components/ImageInput';

export default function EditMeetup() {
  return (
    <Container>
      {/* <ImageInput /> */}
      <input type="text" placeholder="Title" />
      <textarea placeholder="Description" />
      <input type="text" placeholder="Meetup title" />
      <input type="text" placeholder="Location" />
    </Container>
  );
}
