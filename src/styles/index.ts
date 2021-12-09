import styled from 'styled-components';

export const Wrapper = styled.section`
  grid-column: 2/3;
  cursor: pointer;
`;

export const Content = styled.pre`
  font-size: 16px;
  font-family: monospace;
`;

export const Title = styled.h3`
  background: #f1f5f1;
  margin-bottom: 6px;
  margin-top: 19px;
  padding: 3px 26px;
  color: #58911f;
  font-size: 17px;
`;

export const Chords = styled(Content)`
  margin: 0;
  color: #58911f;
`;

export const Text = styled(Content)`
  margin-top: 2px;
  margin-bottom: 4px;
  color: #292825;
`;
