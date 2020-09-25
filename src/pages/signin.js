import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { Form } from '../components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(3).required(),
});

export default function Signin() {
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
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        setLoading(false);
        history.push(ROUTES.BROWSE);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign In</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}
          <Form.Base onSubmit={handleSubmit(onSubmit)}>
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
              Sign In
            </Form.Submit>

            <Form.Text>
              New to Neflix? <Form.Link to="/signup">Sign up now.</Form.Link>
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
