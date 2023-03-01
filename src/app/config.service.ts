import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

/**
 * A service to fetch and store configuration from the API
 */
@Injectable()
export class ConfigService {

    public config: any;

    constructor(private httpClient: HttpClient) {
        console.log("ConfigService()");
    }

    public async getConfig(): Promise<any> {
        console.log("ConfigService.getConfig()");
        this.config = await this.httpClient.get("assets/config.json").toPromise();
        return this.config;
    }
}
