import { Serializer } from 'jsonade';

const locationSerializer = new Serializer('location', {
  attributes: [
    'address',
    'postalCode',
    'city',
    'country',
    'coordinates',
  ],
  coordinates: {
    attributes: [
      'lat',
      'lng',
    ],
  },
});

const visitorsSerializer = new Serializer('visitor', {
  attributes: [
    'name',
    'email',
    'mobile',
    'avatar',
    'langCode',
  ],
});

const mediaSerializer = new Serializer('media', {
  attributes: [
    'name',
    'url',
  ],
});

const seedSerializer = new Serializer('seed', {
  attributes: [
    'id',
    'ownerId',
    'title',
    'description',
    'start',
    'end',
    'end',
    'recurs',
    'likes',
    'location',
    'media',
    'visitors',
  ],
  location: locationSerializer,
  visitors: visitorsSerializer,
  media: mediaSerializer,
});

export { seedSerializer };