export function useUser() {
  const { nhost } = useNhost()

  const user = useState('user-state', () => nhost.auth.getUser())

  return {
    user,
  }
}
