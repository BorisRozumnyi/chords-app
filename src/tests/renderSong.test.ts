import { renderSong } from '../utils';

describe('renderSong', () => {
  it('G    D', () => {
    expect(renderSong('G    D')).toBe(
      '<pre><i class="chord">G</i>    <i class="chord">D</i></pre>',
    );
  });

  it('multiline', () => {
    const content = 'E&nbsp; &nbsp; A&nbsp; &nbsp; H<div>1---2---3</div>';
    expect(renderSong(content)).toBe(
      '<pre><i class="chord">E</i>  <i class="chord">A</i>  <i class="chord">H</i></pre><p>1---2---3</p>',
    );
  });

  it('F#m', () => {
    expect(renderSong('F#m')).toBe('<pre><i class="chord">F#m</i></pre>');
  });

  it('with some text', () => {
    expect(renderSong('some text')).toBe('<p>some text</p>');
  });

  it('with spaces before a chord', () => {
    expect(renderSong('  F')).toBe(
      '<pre>  <i class="chord">F</i></pre>',
    );
  });
});
