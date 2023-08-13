import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const client_id = ""
  const client_secret = ""
  const [token, setToken] = useState("")
  const [tokenType, setTokenType] = useState("")
  const [currentSongURL, setCurrentSongURL] = useState("")
  const [artistImage, setArtistImage] = useState("")
  

  useEffect(() => {
    getToken()
  }, [])

  function getToken() {
    fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    })
    .then(r => {
      if(r.ok){
        r.json().then((data) => {
          console.log(data)
          setToken(data.access_token)
          setTokenType(data.token_type)
        })
      }
    })
    
  }

  function getSong(){
    fetch('https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl', {
      method: "GET",
      headers: {
        "Authorization": `${tokenType} ${token}`
      }
    })
    .then(r => {
      if(r.ok){
        r.json().then((data) => {
          console.log(data)
          setCurrentSongURL(data.external_urls.spotify)
          setArtistImage(data.album.images[0].url)
        })
      }
    })
  }

  return (
    <div className="App">
        <h1>Hello world!</h1>
        {token ? <button onClick={getSong}>get Song</button> : <p>loading</p>}
        {currentSongURL ? <audio src={currentSongURL} controls /> : null}
        {artistImage ? <img src={artistImage} /> : null }
    </div>
  );
}

export default App;
