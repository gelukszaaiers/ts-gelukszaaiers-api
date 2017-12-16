import { Serializer } from 'jsonade';

const authSerializer = new Serializer('auth', {
  attributes: ['accessToken', 'refreshToken'],
});

export { authSerializer };
