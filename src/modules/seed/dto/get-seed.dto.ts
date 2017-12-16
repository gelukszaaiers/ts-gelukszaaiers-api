import { Location } from '../../../entity/location.entity';
import { Media } from '../../../entity/media.entity';
import { User } from '../../../entity/user.entity';

export class GetSeedDto {
  readonly id: string;
  readonly ownerId: string;
  readonly title: string;
  readonly description: string;
  readonly start: Date;
  readonly end: Date;
  readonly recurs: string;
  readonly likes: number;
  readonly location: Location;
  readonly media: Media;
  readonly visitors: User[];
}