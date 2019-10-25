import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { Container, Image } from './styles';
import api from '~/services/api';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [file, setFile] = useState(profile.avatar && profile.avatar.id);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [preview, setPreview] = useState(profile.avatar && profile.avatar.url);

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
        avatar_id: file,
      })
    );
  }

  async function handleChange(e) {
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

  return (
    <Container>
      <form>
        <Image>
          <label htmlFor="avatar">
            <img
              src={
                preview ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt=""
            />

            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </Image>

        <input
          placeholder="Your complete name"
          value={name}
          onChange={setName}
        />
        <input
          type="email"
          placeholder="Your e-mail address"
          value={email}
          onChange={setEmail}
        />

        <hr />

        <input
          type="password"
          placeholder="You current password"
          value={oldPassword}
          onChange={setOldPassword}
        />
        <input
          type="password"
          placeholder="You new password"
          value={password}
          onChange={setPassword}
        />
        <input
          type="password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={setConfirmPassword}
        />

        <button type="button" onClick={handleSubmit}>
          Update profile
        </button>
      </form>
    </Container>
  );
}
