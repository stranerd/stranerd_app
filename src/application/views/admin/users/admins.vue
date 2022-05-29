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
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AdminUsersAdmins',
	components: { AdminWrapper, AdminsList, UpgradeUserToAdmin },
	beforeRouteEnter: generateMiddlewares(['isAdmin']),
	setup () {
		useRouteMeta('Admins')
	}
})
</script>
