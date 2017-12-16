import { Location } from '../../../entity/location.entity';

export class CreateSeedDto {
  readonly title: string;
  readonly description: string;
  readonly start: Date;
  readonly end: Date;
  readonly recurs: string;
  readonly recursTimes: number;
  readonly location: Location;
}