import { renderSong } from '../utils';

describe('renderSong', () => {
  it('G    D', () => {
    expect(renderSong('G    D')).toBe('<pre><i>G</i>    <i>D</i></pre>');
  });

  it('multiline', () => {
    const content = 'E&nbsp; &nbsp; A&nbsp; &nbsp; H<div>1---2---3</div>'
    expect(renderSong(content)).toBe('<pre><i>E</i>  <i>A</i>  <i>H</i></pre><p>1---2---3</p>');
  });

  it('F#m', () => {
    expect(renderSong('F#m')).toBe('<pre><i>F#m</i></pre>');
  });

  it('with some text', () => {
    expect(renderSong('some text')).toBe('<p>some text</p>');
  });
});
