import React, { FormEvent } from 'react';

type Props = {
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
};

export const TransportField: React.FC<Props> = ({ handleChange }) => {
  
  return (
    <>
      <input type="number" name="transpose-by-semitones" onChange={handleChange} />
    </>
  );
};
