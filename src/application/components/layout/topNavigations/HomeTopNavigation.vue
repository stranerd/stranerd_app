<template>
	<IonHeader class="w-full flex flex-col z-10 nav-shadow" role="navigation">
		<div class="container lg:flex mx-auto items-center justify-between p-4 hidden">
			<div class="flex font-bold items-center gap-4">
				<Logo/>	
				<span class="text-2xl ">Stranerd</span>
			</div>
		
			<div class="flex items-center justify-between gap-12">
				<span>Home</span>
				<span>Features</span>
				<span>About</span>
			</div>
			<div class="flex items-center justify-between gap-8 px-3">
				<router-link class="  rounded-md border border-primaryBg text-primaryBg font-bold px-4 py-1.5"
					to="/auth/signin">
					Log In
				</router-link>
				<router-link class=" rounded-md font-bold bg-primaryBg px-4 py-1.5 text-white" to="/auth/signup">
					Sign Up
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

export default defineComponent({
	name: 'HomeTopNavigation',
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
