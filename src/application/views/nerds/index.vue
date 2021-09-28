<template>
	<section>
		<TutorsList />
	</section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TutorsList from '@/application/components/users/tutors/TutorsList.vue'

export default defineComponent({
	name: 'NerdsPage',
	components: { TutorsList },
	layout: 'dashboard',
	setup () {
		// useMeta(() => ({
		// 	title: 'Meet a Nerd | Stranerd'
		// }))
		return {}
	},
	head: {}
})
</script>
