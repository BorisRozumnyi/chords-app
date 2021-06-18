import React from 'react';

type Props = {
  content?: (val: any) => void;
};

export const RenderSong: React.FC<Props> = ({ content }) => <h1>RenderSong</h1>;
