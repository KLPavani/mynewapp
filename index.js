const express = require('express');
const axios = require('axios');

const app = express();
const port = 3050; // You can change the port as needed

// Function to get a random quote from the Quotable API
async function getRandomQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data.content;
    const author = response.data.author;
    return `"${quote}" - ${author}`;
  } catch (error) {
    // Check if the error is due to a wrong path (e.g., network error)
    if (error.code === 'ENOTFOUND') {
      throw new Error('Error fetching random quote: Wrong path or network issue');
    } else {
      throw new Error('Error fetching random quote:', error.message);
    }
  }
}

// Define routes
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Quotes App</h1>');
});

app.get('/quote', async (req, res) => {
  try {
    const randomQuote = await getRandomQuote();
    res.send(`<h2>${randomQuote}</h2>`);
  } catch (error) {
    res.status(500).send(`<h2>${error.message}</h2>`);
  }
});

// Catch-all route for any other paths
app.all('*', (req, res) => {
  res.status(404).send('<h2>You entered the wrong path</h2>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
