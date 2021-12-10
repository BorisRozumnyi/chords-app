import styled from 'styled-components';

export const RangeContainer = styled.div`
  display: flex;
  overflow: auto;

  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #efc;
    border-radius: 3px;
  }
`;
