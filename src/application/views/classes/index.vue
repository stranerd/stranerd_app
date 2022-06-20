<template>
	<DefaultLayout>
		<ClassesList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Classes',
	components: { ClassesList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Classes', {})
	}
})
</script>
