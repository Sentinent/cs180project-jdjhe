import { useState, useEffect } from 'react';
import axios from 'axios';

function ShowConnection() {
  const [Connected, setConnect] = useState('no connection');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:5000/');

      setConnect(result.data);
    };
    fetchData();
  }, []);

  return <h1>{Connected}</h1>;
}

export default ShowConnection;
