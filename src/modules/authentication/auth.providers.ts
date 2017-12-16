import { Connection, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { AuthService } from './auth.service';
import { UsersService } from './../user/users.service';
import { FacebookStrategy } from './passport/facebook.strategy';
import { authSerializer } from './auth.serializer';

export const authProviders = [
  {
    provide: 'AuthServiceToken',
    useClass: AuthService,
  },
  {
    provide: 'authSerializer',
    useFactory: () => authSerializer,
  },
  {
    provide: 'FacebookStrategy',
    useClass: FacebookStrategy,
  },
  { provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
];
