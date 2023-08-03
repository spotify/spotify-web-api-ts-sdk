import { useEffect, useState } from 'react'
import { SpotifyApi, Scopes, SearchResults } from "../../src";
import './App.css'

function App() {
  const [mounted, setMounted] = useState(false);
  const [spotifyApi, setSpotifyApi] = useState<SpotifyApi>();

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    const api = SpotifyApi.withUserAuthorization(
      import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      import.meta.env.VITE_REDIRECT_TARGET,
      Scopes.all,
    );

    api.authenticate().then(async () => {
      const accessToken = await api.getAccessToken();

      if (accessToken) {
        setSpotifyApi(api);
      }
    });
  }, [mounted]);

  return (<SpotifySearch spotifyApi={spotifyApi} />)
}

function SpotifySearch({ spotifyApi }: { spotifyApi: SpotifyApi | undefined }) {
  const [results, setResults] = useState<SearchResults>();

  useEffect(() => {
    if (!spotifyApi) {
      return;
    }

    spotifyApi.search("The Beatles", ["artist"]).then((results) => {
      setResults(results);
    });
  }, [spotifyApi]);

  // generate a table for the results
  const tableRows = results?.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </>
  )
}

export default App;
