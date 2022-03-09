<template>
	<DashboardLayout>
		<ClassesList class="md:px-4 md:py-4" />
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import ClassesList from '@app/components/classes/classes/ClassesList.vue'

export default defineComponent({
	name: 'Classes',
	displayName: 'Classes',
	components: { DashboardLayout, ClassesList },
	middlewares: ['isAuthenticated']
})
</script>
