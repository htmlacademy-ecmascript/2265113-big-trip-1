export const getDefaultPoint = () => ({
  'id': '',
  'price': 0,
  'dateFrom': new Date().toISOString(),
  'dateTo': new Date().toISOString(),
  'destination': '',
  'isFavorite': false,
  'offers': [],
  'type': 'taxi'
});
