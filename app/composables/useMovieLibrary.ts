// composables/useMovieLibrary.ts
import { ref } from "vue";
import { saveFullLibrary, loadFullLibraryFromDB } from "./movieDb";

export type VodCategory = {
  category_id: string;
  category_name: string;
};

export type VodStream = {
  num?: number;
  name: string;
  stream_type: "movie";
  stream_id: number;
  stream_icon?: string | null;
  rating?: string;
  rating_5based?: number;
  tmdb?: string;
  added?: string; // unix timestamp string
  is_adult?: number;
  category_id?: string;
  container_extension?: string;
};

export type MovieRow = {
  category: VodCategory;
  movies: VodStream[];
};

// same blocked list you used before
const blockedPrefixes = [
  "SOCCER",
  "DE -",
  "BE -",
  "PT/BR -",
  "ES -",
  "FR -",
  "LA -",
  "AF -",
  "QC -",
  "IT -",
  "NL -",
  "GR -",
  "NORDIC",
  "SVENSKA",
  "DANSKE",
  "NORGE",
  "MT -",
  "BG -",
  "AL -",
  "EX -",
  "TR -",
  "IR -",
  "SO -",
  "IN -",
  "BN -",
  "PK -",
  "BR -",
  "PL -",
  "EN - ITALIAN SUB ENG",
].map((s) => s.toLowerCase());

const isBlockedCategoryName = (name: string) => {
  const lower = name.toLowerCase();
  return blockedPrefixes.some((prefix) => lower.startsWith(prefix));
};

export const useMovieLibrary = () => {
  const categories = useState<VodCategory[]>("libCategories", () => []);
  const rows = useState<MovieRow[]>("libRows", () => []);
  const lastSync = useState<number | null>("libLastSync", () => null);
  const isSyncing = useState<boolean>("libIsSyncing", () => false);
  const syncError = useState<string | null>("libSyncError", () => null);

  const { xtreamFetch } = useXtreamClient();

  // Load from IndexedDB on app start / refresh
  const loadFromCache = async () => {
    if (!process.client) return; // avoid running on server
    try {
      const { categories: cats, rows: r, lastSync: ls } =
        await loadFullLibraryFromDB();

      if (cats.length) {
        categories.value = cats;
        rows.value = r;
        lastSync.value = ls;
      }
    } catch (e) {
      console.error("[movieLibrary] loadFromCache error:", e);
    }
  };

  const syncFromXtream = async () => {
    isSyncing.value = true;
    syncError.value = null;

    try {
      // 1) get ALL categories
      const allCats = await xtreamFetch<VodCategory[]>({
        action: "get_vod_categories",
      });

      // 2) filter out blocked categories
      const allowedCats = allCats.filter(
        (c) => !isBlockedCategoryName(c.category_name)
      );

      const tempRows: MovieRow[] = [];

      // 3) for each allowed category, fetch ALL movies (no max)
      for (const cat of allowedCats) {
        try {
          const data = await xtreamFetch<VodStream[]>({
            action: "get_vod_streams",
            category_id: cat.category_id,
          });

          // We *can* slim here if you want, but no "max" limit:
          const slim: VodStream[] = data.map((m) => ({
            stream_id: m.stream_id,
            name: m.name,
            stream_type: m.stream_type,
            stream_icon: m.stream_icon,
            rating: m.rating,
            rating_5based: m.rating_5based,
            added: m.added,
            category_id: m.category_id,
            container_extension: m.container_extension,
          }));

          tempRows.push({
            category: cat,
            movies: slim,
          });
        } catch (err) {
          console.warn(
            "[movieLibrary] skipping category (no response):",
            cat.category_name
          );
        }
      }

      const now = Date.now();

      // 4) Save to IndexedDB (full library)
      if (process.client) {
        await saveFullLibrary(allowedCats, tempRows, now);
      }

      // 5) Update Nuxt state
      categories.value = allowedCats;
      rows.value = tempRows;
      lastSync.value = now;
    } catch (err: any) {
      console.error("[movieLibrary] sync error:", err);
      syncError.value = err?.message || "Failed to sync movie library.";
    } finally {
      isSyncing.value = false;
    }
  };

  return {
    categories,
    rows,
    lastSync,
    isSyncing,
    syncError,
    loadFromCache,
    syncFromXtream,
  };
};
