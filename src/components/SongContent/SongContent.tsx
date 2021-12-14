import { useEffect, useState, useRef, FC, ReactNode } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { isChords } from '../../utils';

type Props = {
  songContent: string | ReactNode;
  // songContent: : string | CatalogComponentProps;
};

export const SongContent: FC<Props> = ({ songContent }) => {
  const text = useRef('');

  const handleChange = (e: ContentEditableEvent) => {
    text.current = e.currentTarget.innerHTML;
    console.log(text.current);
  };

  const handleBlur = () => {
    const sp = text.current
      .split('<div>')
      .map((row) => row.replace('</div>', '').replace('&nbsp;', ''));
    const res = sp.map((row) => isChords(row));
    console.log(text.current, sp, res);
  };

  return (
    <ContentEditable
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
