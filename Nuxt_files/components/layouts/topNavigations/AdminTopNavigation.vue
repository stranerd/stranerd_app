<template>
	<nav class="px-2 bg-primary">
		<div
			class="col-lg-8 offset-lg-2 col-md-10 offset-md-1 py-0 d-flex px-0 align-items-center justify-content-center"
		>
			<NuxtLink class="nav-link-custom px-md-3 py-md-1 px-1 py-1" to="/admin/questions/subjects">
				<span>Subjects</span>
			</NuxtLink>
			<NuxtLink class="nav-link-custom px-md-3 py-md-1 px-1 py-1" to="/admin/users/admins">
				<span>Admins</span>
			</NuxtLink>
			<NuxtLink class="nav-link-custom px-md-3 py-md-1 px-1 py-1" to="/admin/reports">
				<span>Reports</span>
			</NuxtLink>
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
	name: 'AdminTopNavigation'
})
</script>

<style lang="scss" scoped>
	.nav-link-custom {
		font-size: 17px;
		color: white;
	}

	a.nuxt-link-active {
		font-size: 17px;
		color: white;
		background-color: $color-primary-dark;
	}
</style>
