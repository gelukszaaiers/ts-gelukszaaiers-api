import * as config from "config";
import { CryptoService } from './crypto.service';

export const cryptoProviders = [
  {
    provide: "CryptoServiceToken",
    useClass: CryptoService,
  },
];
