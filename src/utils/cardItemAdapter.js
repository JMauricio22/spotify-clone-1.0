export const recomendationAdapter = (recommendations) => ({
  id: recommendations.id,
  artistId: recommendations?.artists[0]?.id,
  title: recommendations?.name,
  subtitle: recommendations?.artists[0]?.name,
  image: recommendations?.album?.images[0]?.url,
});

export const artistAdapter = (artists) => ({
  id: artists.id,
  title: artists?.name,
  subtitle: 'Artist',
  image: artists?.images[0]?.url,
  roundedImage: true,
});

export const generateItemsWithArtisAdapter = (artists) => artists.map((artist) => artistAdapter(artist));

export const generateItemsWithRecommendationAdaptor = (recommendations) =>
  recommendations.map((recommendation) => recomendationAdapter(recommendation));
