<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '~/components/ui/toast'

definePageMeta({
  layout: 'blank',
})

const { toast } = useToast()
const frm = ref({
  email: '',
  password: '',
})
const db = useDB()

async function signInWithEmailAndPassword() {
  const { data, error } = await db.auth.signInWithPassword({
    email: frm.value.email,
    password: frm.value.password,
  })
  if (error) {
    toast({
      title: 'Login failed.',
      description: error.message,
      variant: 'destructive',
    })
    throw new Error(error.message)
  }
  const { session } = data
  if (session) {
    toast({
      title: 'Login successful.',
      description: 'Welcome back.',
    })
    navigateTo('/')
  }
}

async function signInWithSocial(provider: 'google' | 'github') {
  try {
    await db.auth.signInWithOAuth({
      provider,
    })
  }
  catch (error) {
    throw new Error(`Failed to sign in with ${provider}: ${error}`)
  }
}

async function onSubmit(provider?: 'google' | 'github') {
  if (!provider) {
    await signInWithEmailAndPassword()
  }
  else {
    await signInWithSocial(provider)
  }

  toast({
    title: 'Login successful.',
    description: 'Welcome back.',
  })
}
</script>

<template>
  <div class="grid h-screen place-items-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Sign in
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
          <Button class="w-full" @click="onSubmit()">
            Sign in
          </Button>
          <Button variant="outline" class="w-full" @click="onSubmit('google')">
            Sign in with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <NuxtLink to="/sign-up" class="underline">
            Sign up
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
