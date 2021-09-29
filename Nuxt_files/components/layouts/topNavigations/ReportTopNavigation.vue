<template>
	<nav class="flex justify-content-center align-items-center" role="navigation">
		<NuxtLink to="/admin/reports/questions">
			Questions
		</NuxtLink>
		<NuxtLink to="/admin/reports/answers">
			Answers
		</NuxtLink>
		<NuxtLink to="/admin/reports/users">
			Users
		</NuxtLink>
	</nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AdminTopNavigation'
})
</script>

<style lang="scss" scoped>
	a {
		border: 1px solid $color-line;
		color: $color-sub;
		background: #fff;
		font-weight: bold;
		padding: 0.5rem 1rem;
		@media (min-width: $md) {
			padding: 0.5rem 2rem;
		}
	}

	a.nuxt-link-exact-active {
		background: $color-primary;
		border: 1px solid $color-primary;
		color: $color-white;
	}
</style>
