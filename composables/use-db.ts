import type { Database } from '~/database.types'

export function useDB() {
  const supabase = useSupabaseClient<Database>()
  return supabase
}
