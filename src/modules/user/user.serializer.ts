import { Serializer } from 'jsonade';

const userSerializer = new Serializer('user', {
  attributes: ['id', 'name', 'email', 'mobile', 'verified', 'avatar', 'langCode'],
});

export { userSerializer };
