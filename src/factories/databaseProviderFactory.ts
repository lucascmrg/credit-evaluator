import { InMemoryDB } from '../app/databaseProviders/inmemoryDB';

export class DatabaseProviderFactory {
  private activeDatabaseProvider: string;
  private databaseProvivers = [InMemoryDB];
  constructor() {
    this.activeDatabaseProvider = process.env.ACTIVE_DATABASE_PROVIDER;
  }

  getActiveDatabase() {
    const DatabaseProvider = this.databaseProvivers.find(
      (databaseProviver) =>
        databaseProviver.name === this.activeDatabaseProvider,
    );

    return new DatabaseProvider();
  }
}
