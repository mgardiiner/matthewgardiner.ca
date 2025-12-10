// composables/movieDb.ts
import { openDB } from "idb";
import type { VodCategory, VodStream, MovieRow } from "./useMovieLibrary";

const DB_NAME = "iptvMovieLibrary";
const DB_VERSION = 1;

type MovieRecord = VodStream & { _category_id: string };

export async function getMovieDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // categories keyed by category_id
      if (!db.objectStoreNames.contains("categories")) {
        db.createObjectStore("categories", { keyPath: "category_id" });
      }

      // movies keyed by stream_id, indexed by category
      if (!db.objectStoreNames.contains("movies")) {
        const store = db.createObjectStore("movies", {
          keyPath: "stream_id",
        });
        store.createIndex("by_category", "_category_id", { unique: false });
      }

      // meta store for lastSync etc.
      if (!db.objectStoreNames.contains("meta")) {
        db.createObjectStore("meta", { keyPath: "key" });
      }
    },
  });

  return db;
}

// ---- Save full library (overwrite everything) ----
export async function saveFullLibrary(
  cats: VodCategory[],
  rows: MovieRow[],
  lastSync: number
) {
  const db = await getMovieDB();

  const catTx = db.transaction("categories", "readwrite");
  const catsStore = catTx.objectStore("categories");
  await catsStore.clear();
  for (const c of cats) {
    await catsStore.put(c);
  }
  await catTx.done;

  const moviesTx = db.transaction("movies", "readwrite");
  const moviesStore = moviesTx.objectStore("movies");
  await moviesStore.clear();

  for (const row of rows) {
    const cid = row.category.category_id;
    for (const m of row.movies) {
      const rec: MovieRecord = {
        ...m,
        _category_id: cid,
      };
      await moviesStore.put(rec);
    }
  }

  await moviesTx.done;

  const metaTx = db.transaction("meta", "readwrite");
  const metaStore = metaTx.objectStore("meta");
  await metaStore.put({ key: "main", lastSync });
  await metaTx.done;
}

// ---- Load full library ----
export async function loadFullLibraryFromDB(): Promise<{
  categories: VodCategory[];
  rows: MovieRow[];
  lastSync: number | null;
}> {
  const db = await getMovieDB();

  const cats = await db.getAll("categories");
  const meta = await db.get("meta", "main");

  // If no categories, no library yet
  if (!cats.length) {
    return { categories: [], rows: [], lastSync: null };
  }

  const moviesStore = db.transaction("movies", "readonly").objectStore("movies");
  const allMovies = (await moviesStore.getAll()) as MovieRecord[];

  const byCategory = new Map<string, VodStream[]>();
  for (const m of allMovies) {
    const cid = m._category_id;
    if (!byCategory.has(cid)) byCategory.set(cid, []);
    // strip _category_id before returning
    const { _category_id, ...rest } = m;
    byCategory.get(cid)!.push(rest);
  }

  const rows: MovieRow[] = [];
  for (const cat of cats) {
    const movies = byCategory.get(cat.category_id) || [];
    rows.push({ category: cat, movies });
  }

  return {
    categories: cats,
    rows,
    lastSync: meta?.lastSync ?? null,
  };
}
