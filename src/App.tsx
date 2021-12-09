import React, { FormEvent, useEffect, useState } from 'react';
import { GlobalStyle } from './styles/GlobalStyle';
import { RenderSong } from './components/RenderSong';
import { KeyRange } from './components/KeyRange';
import { AppWrapper, Container, EnteringContent } from './styles';
import { isChords, getTransposedKey, getTonalitySteps } from './utils';
import { ChordContext } from './utils/context';
import { TransportField } from './components/TransportField';

export const App = () => {
  const [songContent, setSongContent] = useState('');

  const [editMode, setEditMode] = useState(false);

  const [originTonality, setOriginTonality] = useState<string>('');

  const [currentTonality, setCurrentTonality] = useState<string>('');

  const [transposeValue, setTransposeValue] = useState(0);

  const [originTonalitySteps, setOriginTonalitySteps] = useState<string[]>([]);
  const [currentTonalitySteps, setCurrentTonalitySteps] = useState<string[]>(
    [],
  );

  const handleTransposeBySemitones = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setTransposeValue(Number(value));
  };
  useEffect(() => {
    const tonalityInParentheses = songContent
      .split('\n')[0]
      .match(/\([A-H](#?|b?)(m?)\)/);

    const firstChord = songContent
      .split('\n')
      .find((row) => isChords(row))
      ?.split(' ')[0];

    if (tonalityInParentheses) {
      const tonalityWithoutParentheses = tonalityInParentheses[0]
        .replace('(', '')
        .replace(')', '');
      setOriginTonality(tonalityWithoutParentheses);
      setCurrentTonality(tonalityWithoutParentheses);
    }

    if (firstChord && !tonalityInParentheses) {
      setOriginTonality(firstChord);
      setCurrentTonality(firstChord);
    }

    if (firstChord && !tonalityInParentheses && !currentTonality) {
      setCurrentTonality(firstChord);
    }

    if (transposeValue) {
      setCurrentTonality(getTransposedKey(originTonality, transposeValue));
    }
  }, [songContent, transposeValue, currentTonality, originTonality]);

  useEffect(() => {
    setOriginTonalitySteps(getTonalitySteps(originTonality));
  }, [originTonality]);

  useEffect(() => {
    setCurrentTonalitySteps(getTonalitySteps(currentTonality));
  }, [currentTonality]);

  const handleChangeEnteringContent = (
    e: React.FormEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.currentTarget;
    setSongContent(value);
  };

  return (
    <ChordContext.Provider
      value={{
        originTonality,
        currentTonality,
        originTonalitySteps,
        currentTonalitySteps,
        setOriginTonality,
        setCurrentTonality,
        setOriginTonalitySteps,
        setCurrentTonalitySteps,
      }}
    >
      <GlobalStyle />
      <AppWrapper>
        <Container>
          <KeyRange />
          <TransportField handleChange={handleTransposeBySemitones} />
          {editMode ? (
            <EnteringContent
              value={songContent}
              onChange={handleChangeEnteringContent}
              placeholder="Enter text with chords here"
              onBlur={() => setEditMode(false)}
              autoFocus
              rows={songContent.split('\n').length}
            />
          ) : (
            <RenderSong songContent={songContent} setEditMode={setEditMode} />
          )}
        </Container>
      </AppWrapper>
    </ChordContext.Provider>
  );
};
