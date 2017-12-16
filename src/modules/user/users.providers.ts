import { Connection, Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { UsersService } from './users.service';

export const usersProviders = [
  { provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'UsersServiceToken',
    useClass: UsersService,
  }
];
