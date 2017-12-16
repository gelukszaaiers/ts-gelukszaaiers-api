import { Connection, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Device } from '../../entity/device.entity';
import { AuthService } from './auth.service';
import { UsersService } from './../user/users.service';
import { FacebookStrategy } from './passport/facebook.strategy';
import { authSerializer } from './auth.serializer';
import { CryptoService } from '../crypto/crypto.service';

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
  {
    provide: 'CryptoServiceToken',
    useClass: CryptoService,
  },
  { provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
  { provide: 'DeviceRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Device),
    inject: ['DbConnectionToken'],
  },
];
