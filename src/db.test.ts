import Dexie, { DexieOptions } from "dexie";
import indexedDB from "fake-indexeddb";
import IDBKeyRange from "fake-indexeddb/lib/FDBKeyRange";

interface IMessage {
  id?: number;
  message: string;
}
class TestDatabase extends Dexie {
  messages: Dexie.Table<IMessage, number>;

  constructor(options?: DexieOptions) {
    super("Database", options);
    this.version(1).stores({
      messages: "++id",
    });
    this.messages = this.table("messages");
  }
}

test("should pass", async () => {
  const db = new TestDatabase({
    indexedDB: indexedDB,
    IDBKeyRange: IDBKeyRange,
  });
  const result = await db.messages.put({ message: "a message" });
  console.warn(result);
  expect(result).not.toBeUndefined();
});
