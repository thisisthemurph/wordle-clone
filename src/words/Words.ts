interface WordReader {
  data: string[];
  read: () => Promise<string[]>;
}

export class Words {
  private reader: WordReader;

  constructor(reader: WordReader) {
    this.reader = reader;
  }

  async getRandomWord(): Promise<string> {
    const words: string[] = await this.reader.read();
    return words[Math.floor(Math.random() * words.length)];
  }
}
