import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RIOT_API_KEY, RIOT_API_URL } from 'src/constants/env.constants';
import { API_KEY_HEADER } from 'src/constants/http.constants';

@Injectable()
export class ApiProvider {

    private apiUrl: string;
    private apikey: string;

    constructor(private configService: ConfigService) {
        this.apiUrl = this.configService.get<string>(RIOT_API_URL);
        this.apikey = this.configService.get<string>(RIOT_API_KEY);
    }


    public getUrl(): string {
        return this.apiUrl;
    }

    public getAuthHeaders(): any {
        let headers = {};

        headers[API_KEY_HEADER] = this.apikey;

        return headers;

    }

}