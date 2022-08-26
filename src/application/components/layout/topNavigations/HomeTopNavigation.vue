<template>
	<IonHeader class="w-full flex flex-col z-10 nav-shadow" role="navigation">
		<div class="container flex mx-auto items-center justify-between p-4">
			<router-link to="/">
				<img alt="logo" class="h-5 md:h-auto" src="/images/icon_with_text.svg">
			</router-link>

			<div class="lg:flex items-center justify-between gap-12 text-base hidden">
				<router-link to="/#solutions">Solutions</router-link>
				<a href="https://upload.stranerd.com" rel="noopener noreferrer" target="_blank">Upload</a>
				<router-link to="/pricing">Pricing</router-link>
				<router-link to="/about">About</router-link>
			</div>

			<div class="flex items-center md:gap-8 gap-2 px-3 w-auto">
				<router-link class="btn-outline" to="/auth/signin">
					Log In
				</router-link>
				<router-link class="btn" to="/auth/signup">
					Sign Up
				</router-link>
			</div>
		</div>
	</IonHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'HomeTopNavigation'
})
</script>

<style lang="scss" scoped>
ion-toolbar {
	--background: #{$color-headerBg};
	--color: #{$color-headerText};
}

.btn-outline {
	@apply rounded-md border border-primaryBg text-primaryBg font-bold px-4 py-1.5 text-xs
}

.btn {
	@apply rounded-md font-bold bg-primaryBg px-4 py-1.5 text-white text-xs
}

.nav-shadow {
	box-shadow: 0 5px 10px rgba(84, 109, 211, 0.1);
}
</style>
