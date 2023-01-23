<template>
	<div>
		<AdminsListCard v-for="admin in admins" :key="admin.hash" :user="admin" class="mb-4" />
		<EmptyState v-if="!loading && !error && admins.length === 0" info="No admins found" />
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts" setup>
import { useAdminsList } from '@app/composable/users/roles/admins'
import AdminsListCard from '@app/components/users/admins/AdminsListCard.vue'

const { loading, error, admins } = useAdminsList()
</script>
