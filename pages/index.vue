<script lang="ts" setup>
import { useToast } from '~/components/ui/toast'

const { toast } = useToast()

function hello() {
  toast({
    title: 'Hello',
    description: 'This is a toast',
  })
}
</script>

<template>
  <div>
    <Button @click="hello">
      Hello
    </Button>
  </div>
</template>
