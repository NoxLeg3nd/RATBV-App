import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system/legacy";
import { Asset } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";

let db = null;
const DB_VERSION_KEY = "gtfs_db_version";
const CURRENT_VERSION = "v1"; // bump this each release
const DB_NAME = `gtfs_${CURRENT_VERSION}.db`;

export async function getDB() {
  if (db) return db;

  const dbDir = `${FileSystem.documentDirectory}SQLite`;
  const dbPath = `${dbDir}/${DB_NAME}`;

  const dir = await FileSystem.getInfoAsync(dbDir);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true });
  }

  const storedVersion = await AsyncStorage.getItem(DB_VERSION_KEY);

  if (storedVersion && storedVersion !== CURRENT_VERSION) {
    const oldPath = `${dbDir}/gtfs_${storedVersion}.db`;
    const oldFile = await FileSystem.getInfoAsync(oldPath);
    if (oldFile.exists) {
      await FileSystem.deleteAsync(oldPath);
      console.log(`Deleted old DB: gtfs_${storedVersion}.db`);
    }
  }

  const file = await FileSystem.getInfoAsync(dbPath);

  if (!file.exists || file.size === 0) {
    const asset = Asset.fromModule(require("../assets/gtfs_v1.db"));
    await asset.downloadAsync();

    const assetUri = asset.localUri ?? asset.uri;
    await FileSystem.copyAsync({ from: assetUri, to: dbPath });
    await AsyncStorage.setItem(DB_VERSION_KEY, CURRENT_VERSION);
    console.log(`Installed DB as ${DB_NAME}`);
  }

  db = await SQLite.openDatabaseAsync(DB_NAME);
  return db;
}