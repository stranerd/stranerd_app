<template>
	<div class="flex flex-col gap-2">
		<UpgradeUserToAdmin />
		<AdminsList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UpgradeUserToAdmin from '@/application/components/users/admin/UpgradeUserToAdmin.vue'
import AdminsList from '@/application/components/users/admin/AdminsList.vue'

export default defineComponent({
	name: 'AdminUsersAdminsPage',
	components: {
		UpgradeUserToAdmin,
		AdminsList
	},
	layout: 'admin',
	// setup () {
	// 	useMeta(() => ({
	// 		title: 'Admins | Stranerd'
	// 	}))
	// },
	head: {}
})
</script>
