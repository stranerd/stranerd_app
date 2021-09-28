<template>
	<div class="d-flex flex-column gap-1">
		<form class="d-flex flex-row align-items-center" @submit.prevent="getUsersByEmail">
			<div class="flex-grow-1">
				<input
					id="email"
					v-model="email"
					autocomplete="email"
					class="form-control py-1 px-1"
					name="subject_name"
					placeholder="Enter user's email address"
					required
				>
			</div>
			<button class="btn btn-lg btn-custom btn-block py-1 px-md-3 px-1 ms-auto" type="submit">
				<span class="d-none d-md-inline-block">Find User</span>
				<span class="d-inline-block d-md-none" style="font-size: 13px; width: 80px;">Find User</span>
			</button>
		</form>
		<div v-if="fetched" class="d-flex flex-column gap-1">
			<DisplayError v-if="users.length === 0" error="No user with such email exists" />
			<div
				v-for="user in users"
				:key="user.hash"
				class="d-flex flex-wrap justify-content-between gap-0-5 align-items-center"
			>
				<div>
					<DynamicText :truncate="true" class="lead">
						{{ user.fullName }}
					</DynamicText>
					<DynamicText :truncate="true" class="small">
						{{ user.email }}
					</DynamicText>
				</div>
				<span v-if="user.roles.isAdmin" class="text-danger">
					Already an admin
				</span>
				<button v-else class="btn btn-sm btn-success" @click="adminUser(user)">
					Make admin
				</button>
			</div>
			<hr class="my-0">
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAdminRoles } from '@/application/hooks/users/roles/admins'

export default defineComponent({
	setup () {
		const {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		} = useAdminRoles()
		return {
			loading, fetched, email, users, error,
			getUsersByEmail, adminUser, reset
		}
	}
})
</script>
<style lang="scss" scoped>
	input {
		border: 1px solid $color-line;
		border-radius: 6px;
		font-size: 16px;
		background-color: $color-tags;
		width: 100%;
		color: grey;
	}

	.btn-custom {
		background-color: $color-primary-dark;
		color: #fff;
		border: 2px solid;
		border-radius: 6px;
		font-size: 16px;
		font-weight: bold;
	}
</style>
