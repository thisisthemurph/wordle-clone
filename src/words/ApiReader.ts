import axios from "axios";

export class ApiReader {
  data: string[] = [];

  constructor(private baseUrl: string) {}

  async read(): Promise<string[]> {
    console.log("We are reading");
    return axios.get<string[]>(`${this.baseUrl}/words`).then((response) => {
      return response.data;
    });
  }
}
