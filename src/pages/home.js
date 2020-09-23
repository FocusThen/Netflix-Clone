import React from 'react';
import { OptForm } from '../components';
import { JumbotronContainer } from '../containers/jumbotron';
import { FooterContainer } from '../containers/footer';
import { FaqContainer } from '../containers/faqs';
import { HeaderContainer } from '../containers/header';

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <OptForm>
          <OptForm.Input placeholder="Email Address" />
          <OptForm.Button>Try it now</OptForm.Button>
          <OptForm.Break />
          <OptForm.Text>
            Ready to watch? Enter your email to create or restart your
            membership.
          </OptForm.Text>
        </OptForm>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqContainer />
      <FooterContainer />
    </>
  );
}
