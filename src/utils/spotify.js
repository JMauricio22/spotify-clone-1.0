const SpotifyWebApi = require('spotify-web-api-node');

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SERVICE_ID,
  clientSecret: process.env.NEXT_PUBLIC_SERVICE_SECRET,
});
