import React, { useState } from 'react';
import { useRouter } from 'next/router';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Link from '../src/components/Link';

export default function Home() {
  const [name, setName] = useState('');
  const router = useRouter();

  function handleFormSubmit(e) {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>
              {db.title}
              {' '}
              &#128075;
            </h1>
          </Widget.Header>

          <Widget.Content>
            <p style={{ lineHeight: 'normal' }}>{db.description}</p>
            <form onSubmit={handleFormSubmit}>

              <Input
                name="userName"
                placeholder="Diz aí seu nome"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <Button type="submit" disabled={!name.length}>
                &#127867; BRINDAR PARA COMEÇAR &#127867;
              </Button>

            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>Quiz da Galera</h1>

            {db.external.map((extern, index) => {
              const [projectName, gitHubUser] = extern
                .replace(/\//g, '')
                .replace('https:', '')
                .replace('.vercel.app', '')
                .split('.');

              return (
                // eslint-disable-next-line react/no-array-index-key
                <p key={extern}>
                  <Widget.Topic
                    as={Link}
                    href={`/quiz/${projectName}___${gitHubUser}`}
                    disabled={!name.length}
                  >
                    {projectName}
                    {' / '}
                    <b>
                      {gitHubUser}
                    </b>
                  </Widget.Topic>
                </p>
              );
            })}
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/afuscella" />
    </QuizBackground>
  );
}
