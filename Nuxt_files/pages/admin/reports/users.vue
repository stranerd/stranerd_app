<template>
	<UserReportsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserReportsList from '@/application/components/reports/users/UserReportsList.vue'

export default defineComponent({
	name: 'UserReportsAdminPage',
	components: { UserReportsList },
	// setup () {
	// 	useMeta(() => ({
	// 		title: 'User Reports | Stranerd'
	// 	}))
	// },
	head: {}
})
</script>
