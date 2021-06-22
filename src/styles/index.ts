import styled from "styled-components";

export const Wrapper = styled.section`
  grid-row: 2/2;
  grid-column: 2/3;
`;

export const Content = styled.pre`
  font-size: 16px;
  font-family: monospace;
`;

export const Title = styled.section`
  background: #f1f5f1;
  padding: 5px;
  color: #58911f;
  font-size: 26px;
`;

export const Chords = styled(Content)`
  color: #58911f;
`;

export const Text = styled(Content)`
  color: #292825;
`;
