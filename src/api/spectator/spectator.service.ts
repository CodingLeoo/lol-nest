import { Injectable } from '@nestjs/common'
import { CurrentGameInfo, FeaturedGames } from './../../common/types';
import { ApiClient } from '../client/api-client';
import { ACTIVE_GAME_BY_ENCRYPTED_SUMMONER_ID, FEATURED_GAMES } from './routes';

@Injectable()
export class SpectatorService {
  constructor(private readonly client: ApiClient) {}

  /**
   * Get an active game for a summoner
   * @param region - the region to execute the call
   * @param encryptedSummonerId - the encryptedSummonerId of the player
   * @returns a CurrentGameInfo object with the current game information
   */
  public getActiveGameByEncryptedSummonerId(
    region: string,
    encryptedSummonerId: string,
  ): Promise<CurrentGameInfo> {
    return this.client.executeGet<CurrentGameInfo>(
      region,
      ACTIVE_GAME_BY_ENCRYPTED_SUMMONER_ID,
      [{ key: 'encryptedSummonerId', value: encryptedSummonerId }],
    );
  }

  /**
   * Gets a list of featured games
   * @param region - the region to execute the call
   * @returns a list of FeaturedGames
   */
  public getFeaturedGames(region: string): Promise<FeaturedGames> {
    return this.client.executeGet<FeaturedGames>(region, FEATURED_GAMES);
  }
}
