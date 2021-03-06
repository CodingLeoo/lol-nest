import { Injectable } from '@nestjs/common';
import { ChampionMastery } from './../../common/types';
import { ApiClient } from '../client/api-client';
import {
  MASTERY_BY_ENCRYPTED_SUMMONER_ID,
  MASTERY_BY_ENCRYPTED_SUMMONER_ID_AND_CHAMPION_ID,
  MASTERY_SCORE_BY_ENCRYPTED_SUMMONER_ID,
} from './routes';
import { Region } from './../../common/enums';

@Injectable()
export class MasteryService {
  constructor(private readonly client: ApiClient) {}

  /**
   * Gets all champion mastery entries for an specific player
   * @param region - the region to execute the call
   * @param encryptedSummonerId - the encryptedSummonerId of the player
   * @returns a list of ChampionMastery objects , sorted by mumber of champion points descending
   */
  public getChampionMasteriesByEncryptedSummonerId(
    region: Region,
    encryptedSummonerId: string,
  ): Promise<ChampionMastery[]> {
    return this.client.executeGet<ChampionMastery[]>(
      region,
      MASTERY_BY_ENCRYPTED_SUMMONER_ID,
      [{ key: 'encryptedSummonerId', value: encryptedSummonerId }],
    );
  }

  /**
   * Gets a mastery for a specific champion in a specific player
   * @param region - the region to execute the call
   * @param encryptedSummonerId - the encryptedSummonerId of the player
   * @param championId - the championId
   * @returns a ChampionMastery object with the detail of the mastery.
   */
  public getChampionMastery(
    region: Region,
    encryptedSummonerId: string,
    championId: string,
  ): Promise<ChampionMastery> {
    return this.client.executeGet<ChampionMastery>(
      region,
      MASTERY_BY_ENCRYPTED_SUMMONER_ID_AND_CHAMPION_ID,
      [
        { key: 'encryptedSummonerId', value: encryptedSummonerId },
        { key: 'championId', value: championId },
      ],
    );
  }

  /**
   * Gets the mastery score of a player
   * @param region - the region to execute the call
   * @param encryptedSummonerId - the encryptedSummonerId of the player
   * @returns a number with the mastery score
   */
  public getMasteryScore(
    region: Region,
    encryptedSummonerId: string,
  ): Promise<number> {
    return this.client.executeGet<number>(
      region,
      MASTERY_SCORE_BY_ENCRYPTED_SUMMONER_ID,
      [{ key: 'encryptedSummonerId', value: encryptedSummonerId }],
    );
  }
}
