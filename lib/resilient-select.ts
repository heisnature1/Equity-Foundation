import type { SupabaseClient } from "@supabase/supabase-js";

/** Postgres and PostgREST error codes meaning "this column does not exist". */
const MISSING_COLUMN_CODES = new Set(["42703", "PGRST204"]);

/** How many unknown columns we will drop before giving up. */
const MAX_COLUMN_DROPS = 4;

function extractMissingColumn(message: string, code: string) {
  if (!MISSING_COLUMN_CODES.has(code)) return null;

  // Supabase words this differently for reads and writes:
  //   read  -> column legal_help_requests.region does not exist   (42703)
  //   write -> Could not find the 'region' column of ...           (PGRST204)
  const fromPostgres = /column\s+[\w".]*?\.?"?(\w+)"?\s+does not exist/i.exec(message);
  if (fromPostgres?.[1]) return fromPostgres[1];

  const fromCache = /Could not find the '(\w+)' column/i.exec(message);
  return fromCache?.[1] ?? null;
}

export type ResilientSelectResult = {
  rows: Array<Record<string, string>>;
  error: string | null;
  droppedColumns: string[];
};

/**
 * Selects rows for an admin table whose live schema may be missing a column the
 * app still asks for — typically a database created before a later
 * `alter table ... add column` was added to `supabase/schema.sql`.
 *
 * One absent optional column must not blank a whole inbox, and it must
 * certainly not do so silently: this drops the unknown column, retries, and
 * reports exactly which columns the database was missing so the admin can be
 * told what to re-run.
 */
export async function selectRowsResilient(
  supabase: SupabaseClient,
  table: string,
  columns: string,
  orderColumn: string,
): Promise<ResilientSelectResult> {
  let remaining = columns;
  const droppedColumns: string[] = [];

  for (let attempt = 0; attempt <= MAX_COLUMN_DROPS; attempt += 1) {
    const { data, error } = await supabase
      .from(table)
      .select(remaining)
      .order(orderColumn, { ascending: false });

    if (!error) {
      return {
        rows: (data ?? []) as unknown as Array<Record<string, string>>,
        error: null,
        droppedColumns,
      };
    }

    const missing = extractMissingColumn(error.message, error.code ?? "");
    const next = missing
      ? remaining
          .split(",")
          .map((column) => column.trim())
          .filter((column) => column !== missing)
      : [];

    if (!missing || next.length === 0) {
      droppedColumns.push(...(missing ? [missing] : []));
      return { rows: [], error: error.message, droppedColumns };
    }

    droppedColumns.push(missing);
    remaining = next.join(", ");
  }

  return {
    rows: [],
    error: `Too many columns are missing from "${table}".`,
    droppedColumns,
  };
}
