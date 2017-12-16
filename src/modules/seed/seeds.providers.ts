import { Connection, Repository } from 'typeorm';
import { Seed } from '../../entity/seed.entity';
import { Location } from '../../entity/location.entity';
import { SeedsService } from './seeds.service';
import { RecurringPattern } from '../../entity/recurringPattern.entity';
import { seedSerializer } from './seed.serializer';
import { User } from '../../entity/user.entity';

export const seedsProviders = [
  {
    provide: 'SeedsServiceToken',
    useClass: SeedsService,
  },
  {
    provide: 'seedSerializer',
    useFactory: () => seedSerializer,
  },
  {
    provide: 'SeedRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Seed),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'LocationRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Location),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'RecurringPatternRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(RecurringPattern),
    inject: ['DbConnectionToken'],
  },
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: ['DbConnectionToken'],
  },
];
