<script lang="ts" setup>
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()
const user = useSupabaseUser()
const db = useDB()
function hello() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
  })
}
const loading = ref(false)
async function signOut() {
  const { error } = await db.auth.signOut()

  if (error) {
    throw new Error(`Failed to sign out: ${error}`)
  }
  if (!user.value) {
    navigateTo('/sign-in')
  }
}
</script>

<template>
  <div>
    <Button @click="hello">
      Hello
    </Button>
    <br>
    <Button :disabled="loading === true" @click="signOut">
      <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
      Sign out
    </Button>
    {{ user ? user.email : '' }}
  </div>
</template>
