import { Connection, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UsersService } from './users.service';
import { userSerializer } from './user.serializer';
import { CryptoService } from '../crypto/crypto.service';

export const usersProviders = [
  { provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'UsersServiceToken',
    useClass: UsersService,
  },
  {
    provide: 'CryptoServiceToken',
    useClass: CryptoService,
  },
  {
    provide: 'userSerializer',
    useFactory: () => userSerializer,
  },
];
