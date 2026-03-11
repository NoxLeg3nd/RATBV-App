import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system/legacy";
import { Asset } from "expo-asset";

let db = null;
const DB_NAME = "gtfs.db";

export async function getDB() {
  if (db) return db;

  const dbDir = `${FileSystem.documentDirectory}SQLite`;
  const dbPath = `${dbDir}/${DB_NAME}`;

  const dir = await FileSystem.getInfoAsync(dbDir);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
  }

  const file = await FileSystem.getInfoAsync(dbPath);

  if (!file.exists || file.size === 0) {
    const asset = Asset.fromModule(require("../assets/gtfs.db"));
    await asset.downloadAsync();

    const assetUri = asset.localUri ?? asset.uri;

    await FileSystem.copyAsync({
      from: assetUri,
      to: dbPath,
    });
  }

  db = await SQLite.openDatabaseAsync(DB_NAME);
   const info = await FileSystem.getInfoAsync(
  `${FileSystem.documentDirectory}SQLite/gtfs.db`
);
  return db;
}