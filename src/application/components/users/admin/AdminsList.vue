<template>
	<div class="flex flex-column items-stretch">
		<AdminsListCard v-for="admin in admins" :key="admin.hash" :user="admin" class="mb-4" />
		<EmptyState v-if="admins.length === 0" info="No admins found apart from you" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminsList } from '@app/composable/users/roles/admins'
import AdminsListCard from '@app/components/users/admin/AdminsListCard.vue'

export default defineComponent({
	name: 'AdminsList',
	components: { AdminsListCard },
	setup () {
		const { loading, error, filteredAdmins } = useAdminsList()
		return { loading, error, admins: filteredAdmins }
	}
})
</script>
