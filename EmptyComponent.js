import React from 'react';
import { Typography } from '@mui/material';
function EmptyComponent() {
  return (
    <section className="max-w-lg items-stretch self-stretch flex flex-col">
        <Typography
          variant="h6"
          align="center"
          color="violet"
          fontWeight="fontWeightBold"
        >
          Nothing to display...
        </Typography>
  
        <Typography
          variant="h1"
          align="center"
          color="gray"
          fontWeight="fontWeightBold"
          fontSize={40}
          letterSpacing="tight"
        >
          Select an item to display
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="slate"
          fontWeight="fontWeightBold"
          fontSize={24}
          lineHeight={2}
        >
          Select an item from the master view to display details in the detail
          view.
        </Typography>

    </section>
    );
  }
export default EmptyComponent