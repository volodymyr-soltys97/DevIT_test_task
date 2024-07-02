import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [concurrency, setConcurrency] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setIsRunning(true);
    setResults([]);
    setError(null);

    const maxRequests = 1000;
    const requestsPerSecond = concurrency;
    const delay = 1000 / requestsPerSecond;

    let activeRequests = 0;
    let completedRequests = 0;

    const sendRequest = async (index) => {
      try {
        const response = await axios.post('http://localhost:3001/api', { index });
        setResults(prev => [...prev, response.data.index]);
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
      } finally {
        activeRequests--;
        completedRequests++;
        if (completedRequests < maxRequests) {
          setTimeout(() => sendRequest(completedRequests + 1), delay);
        } else {
          setIsRunning(false);
        }
      }
    };

    for (let i = 1; i <= Math.min(concurrency, maxRequests); i++) {
      activeRequests++;
      sendRequest(i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  };

  return (
    <div className="App">
      <h1 className='title'>Client-Server Data Fetch</h1>
      <div className='container'>
        <input
          type="number"
          min="0"
          max="100"
          value={concurrency}
          onChange={(e) => setConcurrency(Number(e.target.value))}
          disabled={isRunning}
          className='input'
        />
        <button
          onClick={handleStart}
          disabled={isRunning || concurrency < 1 || concurrency > 100}
          className='button'
        >
          Start
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
