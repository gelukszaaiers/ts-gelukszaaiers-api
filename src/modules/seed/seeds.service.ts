import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Seed } from '../../entity/seed.entity';
import { Location } from '../../entity/location.entity';
import { RecurringPattern } from '../../entity/recurringPattern.entity';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { CreateSeedDto } from './dto/create-seed.dto';
import { User } from '../../entity/user.entity';

@Component()
export class SeedsService {
  constructor(
    @Inject('SeedRepositoryToken') private readonly seedRepository: Repository<Seed>,
    @Inject('LocationRepositoryToken') private readonly locationRepository: Repository<Location>,
    @Inject('RecurringPatternRepositoryToken') private readonly recurringPatternRepository: Repository<RecurringPattern>,
    @Inject('UserRepositoryToken') private readonly userRepository: Repository<User>,
  ) { }

  async addSeed(user, body): Promise<any> {
    try {
      const { title, description, start, end, recurs, recursTimes } = body;
      const { address, postalCode, city, country, coordinates } = body.location;

      const location = await this.locationRepository.save({
        coords: [coordinates.lat, coordinates.lng],
        address,
        postalCode,
        city,
        country,
      });

      const recurringPattern = await this.recurringPatternRepository.save({
        start,
        end,
        interval: recurs,
        numOccurences: Number(recursTimes),
      });

      const seed = await this.seedRepository.save({
        title,
        description,
        location,
        recurringPattern,
        owner: user,
      });

      return Object.assign({}, seed, {
        ownerId: seed.owner.id,
        start: seed.recurringPattern.start,
        end: seed.recurringPattern.end,
        recurs: seed.recurringPattern.interval,
        location: Object.assign({}, seed.location, {
          coordinates: {
            lat: Number(seed.location.coords[0]),
            lng: Number(seed.location.coords[1]),
          },
        }),
        likes: 0,
        media: [],
        visitors: [],
      });
    } catch (e) {
      throw e;
    }
  }

  async findAll(): Promise<Seed[]> {
    // TODO: add filter based on coordinates
    return await this.seedRepository.find();
  }

  async findOne(seedId: string): Promise<any> {
    try {
      const seed = await this.seedRepository.findOneById(seedId);
      if (!seed) throw new Error(`Seed with id ${seedId} is not found`);

      return Object.assign({}, seed, {
        start: seed.recurringPattern.start,
        end: seed.recurringPattern.end,
        recurs: seed.recurringPattern.interval,
        location: Object.assign({}, seed.location, {
          coordinates: {
            lat: Number(seed.location.coords[0]),
            lng: Number(seed.location.coords[1]),
          },
        }),
        likes: 0,
        media: seed.seedMedia,
        visitors: seed.seedParticipations,
      });
    } catch (e) {
      throw e;
    }
  }

  async update(seedId: string, body: UpdateSeedDto): Promise<Seed> {
    try {
      const seedToUpdate = await this.findOne(seedId);
      seedToUpdate.title = body.title || seedToUpdate.title;

      const recurringPatternToUpdate = await this.recurringPatternRepository.findOneById(seedToUpdate.recurringPattern.id);
      recurringPatternToUpdate.start = body.start || recurringPatternToUpdate.start;
      recurringPatternToUpdate.end = body.end || recurringPatternToUpdate.end;

      await this.recurringPatternRepository.save(recurringPatternToUpdate);
      return await this.seedRepository.save(seedToUpdate);
    } catch (e) {
      throw e;
    }
  }

  async removeSeed(seedId: string) {
    try {
      const seedToRemove = await this.findOne(seedId);
      const recurringPatternToRemove = await this.recurringPatternRepository.findOneById(seedToRemove.recurringPattern.id);
      const locationToRemove = await this.locationRepository.findOneById(seedToRemove.location.id);

      await this.seedRepository.remove(seedToRemove);
      await this.recurringPatternRepository.remove(recurringPatternToRemove);
      await this.locationRepository.remove(locationToRemove);
    } catch (e) {
      throw e;
    }
  }
}
