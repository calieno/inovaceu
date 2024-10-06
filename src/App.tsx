import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const latitude = -22.5052887
  const longitude = -44.1305256
  const NASA_API_URL = 'https://power.larc.nasa.gov/api/temporal/daily/point'


  const API_URL = NASA_API_URL+'?latitude='+latitude+'&longitude='+longitude+'&start=20000101&end=20231231&parameters=PRECTOT,WS2M,T2M,QV2M,RH2M&community=AG&format=JSON'

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log para ver a estrutura dos dados
        setData(data.properties.parameter); // Verifique se essa estrutura está correta
        setLoading(false);
      })
      .catch(error => {
        setError(error as Error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error.message}</p>;
  if (!data) return <p>Nenhum dado disponível</p>;

  return (
<div className="App">
      <h1>Dados Climáticos da NASA </h1>
      <h2>(LAT  {latitude} | LON  {longitude})</h2>
      
      <div className="columns">
        {data.T2M && (
          <div className="column">
            <h2>T2M</h2>
            <ul>
              {Object.keys(data.T2M).map(date => (
                <li key={date}>
                  {date}: {data.T2M[date]} °C
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.PRECTOT && (
          <div className="column">
            <h2>PRECTOT</h2>
            <ul>
              {Object.keys(data.PRECTOT).map(date => (
                <li key={date}>
                  {date}: {data.PRECTOT[date]} mm
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.RH2M && (
          <div className="column">
            <h2>RH2M</h2>
            <ul>
              {Object.keys(data.RH2M).map(date => (
                <li key={date}>
                  {date}: {data.RH2M[date]} mm
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.QV2M && (
          <div className="column">
            <h2>QV2M</h2>
            <ul>
              {Object.keys(data.QV2M).map(date => (
                <li key={date}>
                  {date}: {data.QV2M[date]} mm
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.WS2M && (
          <div className="column">
            <h2>WS2M</h2>
            <ul>
              {Object.keys(data.WS2M).map(date => (
                <li key={date}>
                  {date}: {data.WS2M[date]} m/s
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
