import styled from "styled-components";

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

export const ChordButtom = styled.button`
  min-width: 35px;
  min-height: 35px;
  margin: 3px;
  background: #efd;
  padding: 3px;
  border: none;
  border-radius: 50%;
  box-shadow: 0 0 3px 1px #ccc;
  color: green;
  cursor: pointer;
  transition: all .2s;
  :hover {
    box-shadow: 0 0 5px 1px #5c5757;
    position: relative;
    top: 2px;
    transform: scale(1.05);
  }
  :active {
    box-shadow: 0 0 3px 1px #ccc inset;
    transform: translate(0, 1px) scale(.95);
  }
`;
