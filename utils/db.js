import * as SQLite from 'expo-sqlite';
import { Directory, File, Paths } from "expo-file-system";
import { Asset } from 'expo-asset';

let db = null;

export async function getDB() {
    if(db) return db;

    const sqliteDir = new Directory(Paths.document, "SQLite");
    const dbFile = new File(sqliteDir, "gtfs.db");

    if (!dbFile.exists) {
        const asset = Asset.fromModule(require("../assets/gtfs.db"));
        await asset.downloadAsync();
        const assetFile = new File(asset.localUri);
        assetFile.copy(dbFile);
    }

    db = await SQLite.openDatabaseAsync("gtfs.db");
    return db;
}