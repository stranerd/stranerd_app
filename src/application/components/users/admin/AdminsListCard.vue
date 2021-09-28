<template>
	<div :id="admin.id" class="wrapper p-1">
		<div class="d-flex align-items-center gap-1">
			<DynamicText class="name-custom">
				{{ admin.fullName }}
			</DynamicText>
			<a class="text-danger ms-auto" style="font-size: 14px;" @click.prevent="deAdminUser(admin)">
				Remove admin
			</a>
		</div>
		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { useAdminRoles } from '@app/hooks/users/roles/admins'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'AdminsListCard',
	props: {
		admin: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		const { loading, error, deAdminUser } = useAdminRoles()
		return {
			loading, error, deAdminUser
		}
	}
})
</script>
<style lang="scss" scoped>
	.name-custom {
		font-weight: bold;
		font-size: 17px;
		color: $color-dark;
	}

	.wrapper {
		border: 1px solid $color-line;
		border-radius: 5px;
		background-color: $color-tags;
	}
</style>
