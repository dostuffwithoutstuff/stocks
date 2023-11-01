import * as React from 'react';
import Box from '@mui/material/Box';

const ProgressBar = React.memo(function ProgressBar(props) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <>
      <Box sx={{
        border: `1px solid blue`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2,
      }}>
        <Box sx={{
          position: 'absolute',
          lineHeight: '24px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        >{`${valueInPercent.toLocaleString()} %`}</Box>
        <Box sx={{
          height: '100%',
          maxWidth: `${valueInPercent}%`,
          ...(valueInPercent < 30 && {
            backgroundColor: '#f44336',
          }),
          ...(valueInPercent >= 30 && valueInPercent <= 70 && {
            backgroundColor: '#efbb5aa3',
          }),
          ...(valueInPercent > 70 && {
            backgroundColor: '#088208a3',
          }),
        }}
        />
      </Box>
      <Box >
        <Box sx={{
          height: '100%',
          maxWidth: `${valueInPercent}%`,
          ...(valueInPercent < 30 && {
            backgroundColor: '#f44336',
          }),
          ...(valueInPercent >= 30 && valueInPercent <= 70 && {
            backgroundColor: '#efbb5aa3',
          }),
          ...(valueInPercent > 70 && {
            backgroundColor: '#088208a3',
          }),
        }}
        />
      </Box>
    </>
  );
});

export function renderProgress(params) {
  return <ProgressBar value={(params.value)} />;
}