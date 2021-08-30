import { DatabaseProvider } from 'src/interfaces/databaseProvider';

export class InMemoryDB implements DatabaseProvider {
  private database = [];

  public save(item) {
    this.database.push(item);
    return item;
  }
}
