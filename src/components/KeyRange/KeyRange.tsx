import { useContext, useRef, MouseEvent, FC } from 'react';
import { ChordContext } from '../../utils/context';
import { TONALITIES } from '../../utils/';
import { ChordButtom } from '../../styles';
import { RangeContainer } from './KeyRange.styles';

export const KeyRange: FC = () => {
  const RangeContainerRef = useRef<HTMLDivElement>(null);
  const { currentTonality, setCurrentTonality } = useContext(ChordContext);

  const handleMouseMove = ({ clientX }: MouseEvent) => {
    const offsetLeft = RangeContainerRef.current?.offsetLeft;
    const offsetWidth = RangeContainerRef.current?.offsetWidth || 0;
    const mousePosition = (clientX || 0) - (offsetLeft || 0);
    const x = (factor: number) => mousePosition - offsetWidth * factor;
    const multiplierToScrollRight = 0.8;
    const multiplierToScrollLeft = 0.2;
    if (mousePosition > offsetWidth * multiplierToScrollRight)
      RangeContainerRef.current?.scrollBy(x(multiplierToScrollRight), 0);
    if (mousePosition < offsetWidth * multiplierToScrollLeft)
      RangeContainerRef.current?.scrollBy(x(multiplierToScrollLeft), 0);
  };

  return (
    <>
      <RangeContainer
        ref={RangeContainerRef}
        onMouseMove={handleMouseMove}
        id="range-container"
      >
        {TONALITIES.map((item) => (
          <ChordButtom
            key={item}
            onClick={() => setCurrentTonality(item)}
            active={item === currentTonality}
          >
            {item}
          </ChordButtom>
        ))}
      </RangeContainer>
    </>
  );
};
