import React from 'react';
import { createRoot } from 'react-dom/client';
import I18n from 'react-polyglot-hooks';

import { LanguageSwitcher, Translated } from './components';
import Phrases from './phrases';

const App = () => {
  const [locale, setLocale] = React.useState('en');

  return (
    <I18n locale={locale} phrases={Phrases[locale]}>
      <LanguageSwitcher onChange={({ target: { value } }) => setLocale(value)} />
      <br />
      <Translated />
    </I18n>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
