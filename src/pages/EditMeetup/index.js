import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import api from '~/services/api';

import { Container, Image, DateTime } from './styles';
import Button from '~/components/Button';

export default function EditMeetup({ history }) {
  const meetup = history.location.state && history.location.state.meetup;
  const editing = Boolean(history.location.state);

  const [file, setFile] = useState(meetup && meetup.image_id);
  const [preview, setPreview] = useState(meetup && meetup.image.url);
  const [title, setTitle] = useState(meetup && meetup.title);
  const [description, setDescription] = useState(meetup && meetup.description);
  const [date, setDate] = useState(meetup && meetup.date_time);
  const [location, setLocation] = useState(meetup && meetup.location);

  async function handleFileChange(e) {
    try {
      const data = new FormData();

      data.append('file', e.target.files[0]);

      const response = await api.post('files', data);

      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      console.tron.log(err);
    }
  }

  async function handleSubmit() {
    const body = {
      title,
      description,
      date_time: date,
      location,
      image_id: file,
    };

    if (editing) {
      try {
        await api.put(`meetups/${meetup.id}`, body);

        toast.success('The meetup was succesfully updated');
      } catch (err) {
        console.tron.log(err);
      }
    } else {
      try {
        await api.post('meetups', body);

        toast.success('The meetup was succesfully created');
      } catch (err) {
        console.tron.log(err);
      }
    }
  }

  return (
    <Container>
      <Image>
        <label htmlFor="avatar">
          {preview ? (
            <img src={preview} alt="" />
          ) : (
            <span>Select an image</span>
          )}

          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </Image>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <DateTime
        type="datetime-local"
        placeholder="Date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
      />

      <Button onClick={handleSubmit}>{editing ? 'Save' : 'Create'}</Button>
    </Container>
  );
}

EditMeetup.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        meetup: PropTypes.shape({
          title: PropTypes.string,
          image: PropTypes.shape({
            url: PropTypes.string,
          }),
          image_id: PropTypes.number,
          description: PropTypes.string,
          parsedDate: PropTypes.string,
          location: PropTypes.string,
        }),
      }),
    }),
    push: PropTypes.func,
  }).isRequired,
};
