import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { Container, Image, DateTime } from './styles';
import Button from '~/components/Button';

export default function EditMeetup() {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

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
    try {
      const body = {
        title,
        description,
        date_time: date,
        location,
        image_id: file,
      };

      await api.post('meetups', body);

      toast.success('The meetup was created');
    } catch (err) {
      console.tron.log(err);
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

      <Button onClick={handleSubmit}>Save</Button>
    </Container>
  );
}
