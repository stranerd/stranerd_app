<template>
	<div class="flex flex-col text-secondaryText">
		<router-link v-for="{ label, route } in [
			{ label: 'My Practice', route: '/study/preps/' },
			{ label: 'Practice Tests', route: '/study/preps/practice' },
			{ label: 'Solution Manuals', route: '/study/preps/solutions' }
		]" :key="route" :to="route" class="flex card-padding !py-4" exact-active-class="hasBg">
			<IonText>{{ label }}</IonText>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'PrepsView'
})
</script>
