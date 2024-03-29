<template>
	<IonHeader class="w-full container mx-auto" role="navigation">
		<IonToolbar v-if="!show" class="flex flex-col z-10">
			<div class="w-full flex mx-auto items-center justify-between p-4">
				<div class="flex gap-3 items-center">
					<IonIcon :icon="menuOutline" class="block lg:hidden" @click="toggleMenu" />
					<span @click="navigateTo('/')">
						<Logo :showName="true" :size="1.5" />
					</span>
				</div>

				<div class="lg:flex items-center justify-between gap-12 text-base hidden">
					<router-link to="/solutions/students">Solutions</router-link>
					<a href="https://upload.stranerd.com" rel="noopener noreferrer" target="_blank">Upload</a>
					<router-link to="/pricing">Pricing</router-link>
					<router-link to="/about">About</router-link>
					<router-link to="/contact">Contact</router-link>
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
		</IonToolbar>
		<IonToolbar v-if="show" class="fixed inset-0 bg-bodyBg">
			<header class="flex justify-between items-center py-6 px-4">
				<span @click="navigateTo('/')">
					<Logo :showName="true" :size="1.5" />
				</span>
				<IonIcon :icon="closeOutline" @click="toggleMenu" />
			</header>

			<div class="flex flex-col">
				<details>
					<summary class="flex items-center border-top-line py-6 px-4">
						<a class="text-base font-semibold">
							Solutions
						</a>
						<IonIcon :icon="chevronDownOutline" class="ml-2" />
					</summary>

					<div class="flex flex-col px-4">
						<p class=" pb-6 flex flex-col" @click="navigateTo('/solutions/students')">
							<span class="font-bold flex items-center gap-2">For students <IonIcon
								:icon="chevronForwardCircleOutline" /></span>
							<span>Class collaboration and study tools</span>
						</p>
						<p class=" pb-6 flex flex-col" @click="navigateTo('/solutions/schools')">
							<span class="font-bold flex items-center gap-2">For lecturers<IonIcon
								:icon="chevronForwardCircleOutline" /></span>
							<span>Course and student management</span>
						</p>
					</div>
				</details>

				<a class="border-top-line py-6 px-4" href="https://upload.stranerd.com/" rel="noopener noreferrer"
					target="_blank">Upload</a>
				<span class="border-top-line py-6 px-4" @click="navigateTo('/pricing')">Pricing</span>
				<span class="border-top-line py-6 px-4" @click="navigateTo('/about')">About</span>
				<span class="border-top-line py-6 px-4" @click="navigateTo('/contact')">Contact</span>
			</div>
		</IonToolbar>
	</IonHeader>
</template>

<script lang="ts" setup>
import { chevronDownOutline, chevronForwardCircleOutline, closeOutline, menuOutline } from 'ionicons/icons'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const show = ref(false)
const toggleMenu = () => show.value = !show.value
const navigateTo = (route: string) => {
	router.push(route)
	show.value = false
}
</script>

<style lang="scss" scoped>
ion-toolbar {
	--background: #{$color-bodyBg};
	--color: #{$color-bodyText};
	--box-shadow: none;
	--padding-start: 0;
	--padding-end: 0;
}

ion-header {
	--box-shadow: none;
}

.btn-outline {
	@apply rounded-md border border-primaryBg text-primaryBg font-bold px-6 py-1.5 text-xs;
}

.btn {
	@apply rounded-md border border-primaryBg bg-primaryBg font-bold px-6 py-1.5 text-primaryText text-xs;
}

details {
	user-select: none;

	& summary svg.turn {
		color: #c0c0c0;
	}
}

details[open] {
	& summary svg {
		color: #000;
	}

	& summary ion-icon {
		transform: rotate(-180deg);
	}

	& summary p {
		color: #000 !important;
	}
}

summary {
	cursor: pointer;
}

svg {
	transition: all 0.3s;
}

summary::-webkit-details-marker {
	display: none;
}
</style>
