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

async function signUpWithEmailAndPassword() {
  const { data } = await db.auth.signUp({
    email: frm.value.email,
    password: frm.value.password,
  })
  if (!data.session) {
    toast({
      title: 'Sign up failed.',
      description: 'Please try again.',
    })
    return new Error('Failed to sign up.')
  }
  if (data.session) {
    toast({
      title: 'Sign up successful.',
      description: 'Welcome!',
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
  if (provider === undefined) {
    await signUpWithEmailAndPassword()
  }
  else {
    await signInWithSocial(provider)
  }
}
</script>

<template>
  <div class="grid h-screen place-items-center">
    <Card class="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          Sign up
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
              <NuxtLink to="/recovery" class="ml-auto inline-block text-sm underline">
                Forgot your password?
              </NuxtLink>
            </div>
            <Input id="password" v-model="frm.password" type="password" required />
          </div>
          <Button class="w-full" @click="onSubmit">
            Sign up
          </Button>
          <Button variant="outline" class="w-full" @click="onSubmit('google')">
            Sign up with Google
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <NuxtLink to="/sign-in" class="underline">
            Sign in
          </NuxtLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
