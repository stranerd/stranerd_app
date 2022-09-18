<template>
	<DefaultLayout>
		<ComingSoon class="h-full"
			title="We are working with your university to create test preps for you. Stay tuned!" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Study',
	setup () {
		useRouteMeta('Study', {})
	}
})
</script>
