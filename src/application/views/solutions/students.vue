<template>
	<HomeLayout>
		<ForStudent />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import ForStudent from '@app/components/landing/forStudent/index.vue'

export default defineComponent({
	name: 'SolutionsStudents',
	components: { ForStudent },
	setup () {
		useRouteMeta('Students', {})
	}
})
</script>
