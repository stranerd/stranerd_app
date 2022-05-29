<template>
	<IonHeader class="w-full flex flex-col z-10 nav-shadow" role="navigation">
		<div class="md:px-16 p-4 hidden lg:flex items-center justify-between">
			<router-link class="hidden lg:block" to="/">
				<Logo :secondary="true" />
			</router-link>
			<div class="gap-8 lg:flex hidden items-center text-gray">
				<router-link class="link-custom px-4" to="/">
					Home
				</router-link>
				<router-link class="link-custom px-4" to="/questions">
					Questions
				</router-link>
				<router-link class="link-custom px-4" to="/study">
					Study
				</router-link>

				<Search class="flex-grow min-w-[20rem]" />
			</div>
			<div class="gap-8 lg:flex hidden">
				<router-link class="btn border border-faded_gray text-primary !px-10 rounded-xl" to="/auth/signup">
					Sign Up
				</router-link>
				<router-link class="btn btn-custom text-white bg-primary !px-10 rounded-xl"
					to="/auth/signin">
					Log In
				</router-link>
			</div>
		</div>

		<IonToolbar class="lg:hidden px-4 border-0 h-12 flex items-center justify-center">
			<div class="flex items-center justify-center font-bold text-base">
				<span>{{ $route.meta.routeName ?? 'Stranerd' }}</span>
			</div>
		</IonToolbar>
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from '@app/components/core/Logo.vue'
import Search from '@app/components/search/Search.vue'

export default defineComponent({
	name: 'HomeTopNavigation',
	components: { Logo, Search }

})
</script>

<style lang="scss" scoped>
	ion-toolbar {
		--background: #{$color-headerBg};
		--color: #{$color-headerText};
	}

	.link-custom {
		font-weight: 700;
		font-size: 16px;
	}

	.nav-shadow {
		box-shadow: 0 5px 10px rgba(84, 109, 211, 0.1);
	}
</style>
