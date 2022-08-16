<template>
	<DefaultLayout>
		<ClassesList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Classes',
	components: { ClassesList },
	setup () {
		useRouteMeta('Find a Class', { back: true })
	}
})
</script>
