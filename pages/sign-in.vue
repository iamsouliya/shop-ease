<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '~/components/ui/toast'

const { nhost } = useNhost()
const { toast } = useToast()
const frm = ref({
  email: '',
  password: '',
})
const { user } = useUser()
async function handleSignIn() {
  const { error, session } = await nhost.auth.signIn({
    email: frm.value.email,
    password: frm.value.password,
  })
  if (error) {
    toast({
      title: 'Sign in failed',
      description: error.message,
    })
    throw new Error(error.message)
  }

  if (session) {
    user.value = {
      ...session.user,
    }
  }
}

watchEffect(() => {
  if (user.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-2xl">
        Login
      </CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="frm.email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a href="#" class="ml-auto inline-block text-sm underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" v-model="frm.password" type="password" required />
        </div>
        <Button class="w-full" @click="handleSignIn">
          Login
        </Button>
        <Button variant="outline" class="w-full">
          Login with Google
        </Button>
      </div>
      <div class="mt-4 text-center text-sm">
        Don't have an account?
        <a href="#" class="underline">
          Sign up
        </a>
      </div>
    </CardContent>
  </Card>
</template>
