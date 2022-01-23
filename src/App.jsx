import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Form from "./components/Form/Form";
import { enhancedRowCipher } from "./utils/enhancedRowCipher";
import { stringToGrid } from "./utils/srtingToGrid";

function App() {
  const [cipheredObject, setCipheredObject] = useState(null);
  const handleEncrypt = value => {
    const grid = stringToGrid(value);
    const cipheredObject = enhancedRowCipher(grid);
    setCipheredObject(cipheredObject);
  };
  return (
    <Box p={3}>
      <Form onEncrypt={handleEncrypt} />
      {cipheredObject && (
        <>
          <Typography>
            <strong>Left part of key:</strong> {cipheredObject.left}
          </Typography>
          <Typography>
            <strong>Right part of key:</strong> {cipheredObject.right}
          </Typography>
          <Typography>
            <strong>Key (XOR'D):</strong> {cipheredObject.key}
          </Typography>
          <Typography>
            <strong>Ciphered Text: </strong>
            {cipheredObject.cipheredText}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default App;
