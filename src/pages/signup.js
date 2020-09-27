import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';
import * as ROUTES from '../constants/routes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: data.firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          })
          .then(() => {
            setLoading(false);
            history.push(ROUTES.BROWSE);
          })
      )
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
              type="text"
              placeholder="First Name"
              name="firstName"
              ref={register}
            />
            {errors.firstName && (
              <Form.Error>{errors.firstName.message}</Form.Error>
            )}
            <Form.Input
              type="email"
              placeholder="Email address"
              name="email"
              ref={register}
            />
            {errors.email && <Form.Error>{errors.email.message}</Form.Error>}
            <Form.Input
              type="password"
              autoComplete="off"
              placeholder="Password"
              name="password"
              ref={register}
            />
            {errors.password && (
              <Form.Error>{errors.password?.message}</Form.Error>
            )}
            <Form.Submit disabled={loading} type="submit">
              Sign Up
            </Form.Submit>

            <Form.Text>
              Already a user? <Form.Link to="/signin">Sign in now.</Form.Link>
            </Form.Text>
            <Form.TextSmall>
              This page is protected by Google reCAPTCHA.
            </Form.TextSmall>
          </Form.Base>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
