<template>
	<div>
		<ReportTopNavigation class="mb-1" />
		<NuxtChild />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReportTopNavigation from '@app/components/layouts/topNavigations/ReportTopNavigation.vue'

export default defineComponent({
	name: 'ReportAdminsPage',
	components: { ReportTopNavigation },
	layout: 'admin'
})
</script>
