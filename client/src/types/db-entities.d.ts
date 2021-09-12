interface DBRecord {
  id: number | string;
}

interface CustomerWaitingList extends DBRecord {
  email: string;
}
