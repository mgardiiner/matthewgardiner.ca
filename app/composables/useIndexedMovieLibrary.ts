// app/composables/useIndexedMovieLibrary.ts
import { openDB } from "idb";

const DB_NAME = "iptvMovieLibrary";
const DB_VERSION = 1;

export async function getDB() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("categories")) {
        db.createObjectStore("categories", { keyPath: "category_id" });
      }
      if (!db.objectStoreNames.contains("movies")) {
        db.createObjectStore("movies", { keyPath: "stream_id" });
      }
    },
  });
}

// ---- CATEGORY FUNCTIONS ----
export async function saveCategories(categories) {
  const db = await getDB();
  const tx = db.transaction("categories", "readwrite");
  const store = tx.objectStore("categories");

  // wipe old
  const keys = await store.getAllKeys();
  for (const key of keys) await store.delete(key);

  for (const cat of categories) {
    await store.put(cat);
  }

  await tx.done;
}

export async function loadCategories() {
  const db = await getDB();
  return await db.getAll("categories");
}

// ---- MOVIE FUNCTIONS ----
export async function saveMoviesForCategory(categoryId, movies) {
  const db = await getDB();
  const tx = db.transaction("movies", "readwrite");
  const store = tx.objectStore("movies");

  for (const movie of movies) {
    await store.put({
      ...movie,
      _category_id: categoryId, // manual index
    });
  }

  await tx.done;
}

export async function loadMoviesByCategory(categoryId) {
  const db = await getDB();
  const all = await db.getAll("movies");
  return all.filter((m) => m._category_id === categoryId);
}
