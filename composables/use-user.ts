export function useUser() {
  const { nhost } = useNhost()

  const user = useState<any>('user-state', () => null)

  return {
    user,
  }
}
