import { isChords } from '../utils';

describe('isChords', () => {
  it('G    D', () => {
    expect(isChords('G    D')).toBeTruthy();
  });

  it('Ggg', () => {
    expect(isChords('Ggg')).toBeFalsy();
  });

  it('ggG', () => {
    expect(isChords('ggG')).toBeFalsy();
  });

  it('G', () => {
    expect(isChords('G')).toBeTruthy();
  });

  it('with some text', () => {
    expect(isChords('some text')).toBeFalsy();
  });

  it('F#m', () => {
    expect(isChords('F#m')).toBeTruthy();
  });
});
