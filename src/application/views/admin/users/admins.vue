<template>
	<AdminWrapper>
		<div>
			<UpgradeUserToAdmin class="mb-4" />
			<AdminsList />
		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import AdminsList from '@app/components/users/admin/AdminsList.vue'
import UpgradeUserToAdmin from '@app/components/users/admin/UpgradeUserToAdmin.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'AdminUsersAdmins',
	displayName: 'Admins',
	components: { AdminWrapper, AdminsList, UpgradeUserToAdmin },
	beforeRouteEnter: generateMiddlewares(['isAdmin'])
})
</script>
