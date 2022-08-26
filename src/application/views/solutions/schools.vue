<template>
	<HomeLayout>
		<ForSchool />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import ForSchool from '@app/components/landing/forSchool/index.vue'

export default defineComponent({
	name: 'SolutionsSchools',
	components: { ForSchool },
	setup () {
		useRouteMeta('Schools', {})
	}
})
</script>
