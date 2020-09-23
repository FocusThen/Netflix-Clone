import React from 'react';
import { JumbotronContainer } from '../containers/jumbotron';
import { FooterContainer } from '../containers/footer';
import { FaqContainer } from '../containers/faqs';
import { HeaderContainer } from '../containers/header';

export default function Home() {
  return (
    <>
      <HeaderContainer />
      <JumbotronContainer />
      <FaqContainer />
      <FooterContainer />
    </>
  );
}
