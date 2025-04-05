const express = require('express');
const { getHistoricalRates } = require('dukascopy-node');

const app = express();
const port = 3000;

app.use(express.json());


app.post('/historical', async (req, res) => {
  const { instrument, from, to, timeframe, priceType, format, utcOffset, volumes, volumeUnits, flats, cache, cachePath, retries, retryOnEmpty, noFailAfterRetries, retryPause, debug, silent, inline, fileName, dateFormat, timeZone } = req.body;

  if (!instrument || !from || !to) {
    return res.status(400).json({ error: 'Missing required parameters: instrument, from, or to' });
  }

  try {
    const options = {
      instrument: instrument.toLowerCase(),
      dates: {
        from: new Date(from),
        to: new Date(to),
      },
      timeframe: timeframe || 'd1',
      priceType: priceType || 'bid',
      utcOffset: utcOffset || 0,
      volumes: volumes || false,
      volumeUnits: volumeUnits || 'millions',
      flats: flats || false,
      cache: cache || false,
      cachePath: cachePath || './.dukascopy-cache',
      retries: retries || 0,
      retryOnEmpty: retryOnEmpty || false,
      noFailAfterRetries: noFailAfterRetries || false,
      retryPause: retryPause || 500,
      debug: debug || false,
      silent: silent || false,
      inline: inline || false,
      fileName: fileName || '',
      dateFormat: dateFormat || '',
      timeZone: timeZone || ''
    };

    const data = await getHistoricalRates(options);

    res.json(data);
  } catch (err) {
    console.error('Download error:', err);
    console.error('Request body:', req.body);
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Dukascopy Loader API is running!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
