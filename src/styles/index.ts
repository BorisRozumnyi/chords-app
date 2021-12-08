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

type ChordButtomProps = {
  active: boolean;
};

export const ChordButtom = styled.button<ChordButtomProps>`
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
  transition: all 0.2s;
  :hover {
    box-shadow: 0 0 5px 1px #5c5757;
    position: relative;
    top: 2px;
    transform: scale(1.05);
  }
  :active {
    box-shadow: 0 0 3px 1px #ccc inset;
    transform: translate(0, 1px) scale(0.95);
  }
  ${({ active }) =>
    active &&
    `
      background: #69BBFD;
      color: #F9F9F9;
    `}
`;

export const AppWrapper = styled.div`
  display: grid;
  grid-template:
    1fr /
    1fr minmax(auto, 400px) 1fr;
  padding: 0;
  color: #212529;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
`;

export const Container = styled.div`
  grid-column: 2/3;
`;

export const EnteringContent = styled.textarea`
  grid-column: 2;
  width: 100%;
  height: 100%;

  font-family: monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 18.75px;
`;
