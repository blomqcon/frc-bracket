import axios from 'axios';
import { AxiosInstance } from 'axios';

export interface IEvent {
  name?: string
  key?: string
}

export class EventClient {
  private readonly client: AxiosInstance;

  public constructor() {
    this.client = axios.create({
        baseURL: 'https://www.thebluealliance.com/api/v3',
        timeout: 10_000,
        headers: {
          'User-Agent': 'frc-bracket-challenge',
          'X-TBA-Auth-Key': process.env.TBA_Auth_Key
        }
    });
  }

  public async getEvents(): Promise<IEvent[]> {
    const response = await this.client.get<IEvent[]>('/events/2019/simple');
    return response.data;
  }
}
