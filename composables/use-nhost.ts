import { NhostClient } from '@nhost/vue'
export function useNhost() {
  const config = useRuntimeConfig()

  const nhost = new NhostClient({
    subdomain: config.public.nhostSubdomain,
    region: config.public.nhostRegion,
  })

  return {
    nhost,
  }
}
