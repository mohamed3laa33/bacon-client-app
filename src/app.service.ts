import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AppService {
  private readonly BACON_NODE_URL;
  private configService: ConfigService;
  constructor() {
    this.configService = new ConfigService();
    this.BACON_NODE_URL = this.configService.get('BACON_NODE_URL');
  }

  async getSubscriptionMetadata() {
    try {
      const config = {
        headers: { Metadata: true },
      };
      const url = `http://169.254.169.254/metadata/instance?api-version=2017-08-01&format=json`;
      const result = await axios.get(url, config);

      const saveMetaDataResult = await axios.post(
        this.BACON_NODE_URL,
        result.data,
      );
      if (saveMetaDataResult.data) {
        console.log('Subscription exists!');
      } else {
        console.log('Subscription does not exist!');
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
