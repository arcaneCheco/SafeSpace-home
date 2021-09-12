import * as pg from "pg";

export default class DB {
  pool;
  query;
  constructor() {
    this.pool = new pg.Pool({
      user: "safespace_user",
      host: "localhost",
      database: "safespace",
      password: "sm@llMoon47",
      port: 5432,
    });
    this.query = "";
  }
  async run(query: string, ...params: any[]): Promise<any> {
    const q = query.toLowerCase().trim();
    const res = await this.pool.query(q, params);
    return res.rows;
  }
}
