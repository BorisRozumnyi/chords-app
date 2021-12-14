import React, {
  useEffect,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import { isChords, isTitle } from '../utils';
import { Wrapper, Chords, Title, Text } from '../styles';
import { Chord } from '../components/Chord';

type Props = {
  songContent: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const RenderSong: FC<Props> = ({ songContent, setEditMode }) => {
  const [text, setText] = useState('');
  const [textRows, setTextRows] = useState([] as string[]);
  useEffect(() => {
    setTextRows(songContent.split('\n'));
  }, [songContent]);

  const list = textRows.map((row, i) => {
    let rowType = 'text';
    if (isChords(row)) rowType = 'chords';
    if (isTitle(row)) rowType = 'title';

    switch (rowType) {
      case 'chords':
        return (
          <Chords key={Date.now() + i}>
            {row
              .split(' ')
              .map((chord, i) =>
                chord ? <Chord key={chord + i}>{chord}</Chord> : ' ',
              )}
          </Chords>
        );
      case 'title':
        return <Title key={Date.now() + i}>{row}</Title>;
      default:
        return <Text key={Date.now() + i}>{row}</Text>;
    }
  });

  const handleChange = ({
    currentTarget,
  }: React.ChangeEvent<HTMLTableSectionElement>) => {
    console.dir(currentTarget?.innerText);
    setText(currentTarget?.innerText);
  };

  return (
    <Wrapper
      onClick={() => setEditMode(true)}
      contentEditable
      suppressContentEditableWarning
      onInput={handleChange}
    >
      {text}
    </Wrapper>
  );
};
