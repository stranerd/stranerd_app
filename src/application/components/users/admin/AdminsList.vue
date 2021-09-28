<template>
	<div class="d-flex flex-column gap-1">
		<AdminsListCard v-for="admin in admins" :key="admin.hash" :admin="admin" />
		<DisplayWarning v-if="!loading && !error && admins.length === 0" message="No admins found apart from you" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useAdminsList } from '@app/hooks/users/roles/admins'
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
