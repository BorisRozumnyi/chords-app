import { useState, useRef, FC, ReactNode } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { renderSong } from '../../utils';

type Props = {
  songContent: string | ReactNode;
};

export const SongContent: FC<Props> = ({ songContent }) => {
  const text = useRef('');
  const [textState, setTextState] = useState(text.current);

  const handleChange = ({ currentTarget }: ContentEditableEvent) => {
    text.current = currentTarget.innerHTML;
  };

  const handleBlur = () => {
    setTextState(renderSong(text.current));
  };

  return (
    <ContentEditable
      html={textState}
      onBlur={handleBlur}
      onChange={handleChange}
      className="content-editable"
    />
  );
};
