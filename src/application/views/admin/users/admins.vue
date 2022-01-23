<template>
	<AdminWrapper>
		<div>
			<UpgradeUserToAdmin class="mb-8" />
			<AdminsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminsList from '@app/components/users/admin/AdminsList.vue'
import UpgradeUserToAdmin from '@app/components/users/admin/UpgradeUserToAdmin.vue'

export default defineComponent({
	name: 'AdminUserAdminsPage',
	displayName: 'Administration',
	components: { AdminWrapper, AdminsList, UpgradeUserToAdmin },
	middlewares: ['isAdmin']
})
</script>
