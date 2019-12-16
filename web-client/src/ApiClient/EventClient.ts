import { AxiosInstance } from axios from 'axios';


export interface Event {
  name?: string;
  key?: string;
}

export class EventClient {
  private readonly client: AxiosInstance;

  public constructor() {
    this.client = axios.create({
        baseURL: 'https://www.thebluealliance.com/api/v3',
        timeout: 10_000,
        headers: {
          'User-Agent': 'frc-bracket-challenge',
          'X-TBA-Auth-Key': process.env.TBA_Auth_Key,
      },
    });
  }

  public async getEvents(): Promise<Event[]> {
    const response = await this.client.get<Event[]>('/events/2019/simple');
    return response.data;
  }
}
