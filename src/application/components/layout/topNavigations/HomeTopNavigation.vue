<template>
	<IonHeader class="w-full flex flex-col z-10 nav-shadow" role="navigation">
		<div class="container flex mx-auto items-center justify-between p-4">

			<img src="/images/icon_with_text.svg" alt="logo" class="h-5 md:h-auto">

		
			<div class="md:flex items-center justify-between gap-12 text-base hidden">
				<span>Solutions</span>
				<span>Upload</span>
				<span>Pricing</span>
				<span>About</span>
				<span>Contact</span>
			</div>

			<div class="flex items-center  md:gap-8 gap-2 px-3 w-auto">
				<router-link class="btn-outline"
					to="/auth/signin">
					Log In
				</router-link>
				<router-link class="btn" to="/auth/signup">
					Sign Up
				</router-link>
			</div>
		</div>

		<IonToolbar class="hidden  px-4 border-0 h-12  items-center justify-center">
			<div class="flex items-center justify-center font-bold text-base">
				<span>{{ $route.meta.routeName ?? 'Stranerd' }}</span>
			</div>
		</IonToolbar>
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'HomeTopNavigation',
})
</script>

<style lang="scss" scoped>
	ion-toolbar {
		--background: #{$color-headerBg};
		--color: #{$color-headerText};
	}

	.btn-outline {
	@apply  rounded-md border border-primaryBg text-primaryBg font-bold px-4 py-1.5 text-xs
	}
	.btn {
	@apply  rounded-md font-bold bg-primaryBg px-4 py-1.5 text-white text-xs
	}

	.nav-shadow {
		box-shadow: 0 5px 10px rgba(84, 109, 211, 0.1);
	}
</style>
