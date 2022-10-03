<template>
	<details :ontoggle="switchIcon" class=" border-disabled border-b ">
		<summary class="flex items-center py-5 w-[100%] font-bold text-lg cursor-pointer">{{ faq.question }}
			<button class="ml-auto">
				<IonIcon v-if="open" :icon="add" class="text-lg font-bold" />
				<IonIcon v-else :icon="remove" class="text-lg font-bold" />
			</button>
		</summary>
		<div class="leading-normal text-md mb-8">{{ faq.answer }}</div>
	</details>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { add, remove } from 'ionicons/icons'

const open = ref(false)
const switchIcon = () => {
	open.value = !open.value
}

const props = defineProps<{
	faq: { question: string; answer: string; }
}>()
</script>

<style scoped>

</style>

