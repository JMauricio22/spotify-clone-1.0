export const getRecomendationAdapter = (recommendations) => ({
  id: recommendations.id,
  title: recommendations?.name,
  subtitle: recommendations?.artists[0]?.name,
  image: recommendations?.album?.images[0]?.url,
});

export const getArtistsAdapter = (artists) => ({
  id: artists.id,
  title: artists?.name,
  subtitle: 'Artist',
  image: artists?.images[0]?.url,
});
