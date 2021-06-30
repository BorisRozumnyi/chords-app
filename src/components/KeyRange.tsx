import React, {
  useContext,
} from "react";
import { ChordContext } from "../utils/context";
import { TONALITIES } from "../utils/";
import { ChordButtom } from "../styles";

export const KeyRange: React.FC =
  () => {
    const {
      currentTonality,
      setCurrentTonality,
    } = useContext(ChordContext);
    return (
      <>
        {TONALITIES.map((item) => (
          <ChordButtom
            key={item}
            onClick={() =>
              setCurrentTonality(item)
            }
            active={
              item === currentTonality
            }
          >
            {item}
          </ChordButtom>
        ))}
      </>
    );
  };
