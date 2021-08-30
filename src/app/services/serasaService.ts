import { Injectable } from '@nestjs/common';

@Injectable()
export class SerasaService {
  public findScore(userDocument: string) {
    const score = Math.floor(Math.random() * 1000) + 1;
    return {
      document: userDocument,
      score,
    };
  }
}
