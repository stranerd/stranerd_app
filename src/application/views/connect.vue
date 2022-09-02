<template>
	<HomeLayout>
		<div class="bg-primaryBg text-primaryText text-center py-6 w-full">
			<h1>Stranerd Connect</h1>
		</div>
		<Connect />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Connect from '@app/components/landing/connect/index.vue'

export default defineComponent({
	name: 'PageConnect',
	components: { Connect },
	setup () {
		useRouteMeta('Connect', {})
	}
})
</script>
