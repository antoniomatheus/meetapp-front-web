import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Your name is required'),
  email: Yup.string()
    .email('Insert a valid e-mail')
    .required('The e-mail is required'),
  password: Yup.string()
    .min(8, 'The password should have at least 8 characters')
    .required('The password is required'),
});

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="Meetapp logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Your name" />
        <Input name="email" type="email" placeholder="Your e-mail" />
        <Input name="password" type="password" placeholder="Your password" />
        <button type="submit">Sign Up</button>
        <Link to="/">I already have an account</Link>
      </Form>
    </>
  );
}
