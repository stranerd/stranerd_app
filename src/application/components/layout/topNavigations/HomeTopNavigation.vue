<template>
	<IonHeader class="w-full flex flex-col z-10 nav-shadow" role="navigation">
		<div class="container flex mx-auto items-center justify-between p-4">
			<div class="flex gap-3">
				<IonIcon :icon="menuOutline" class="block md:hidden" @click="toggleMenu"/>
				<span @click="navigateTo('/')">
					<img alt="logo" class="h-5 md:h-auto" src="/images/icon_with_text.svg">
				</span>
			</div>

			<div class="fixed inset-0 bg-bodyBg " v-if="show">
				<header class="flex justify-between items-center py-6 px-4">
					<span @click="navigateTo('/')">
						<img alt="logo" class="h-6 md:h-auto" src="/images/icon_with_text.svg">
					</span>
					<IonIcon :icon="closeOutline" class="block md:hidden" @click="toggleMenu"/>
				</header>

				<div class="flex flex-col">
					<!-- <span class="border-top-line py-6 px-4">Solutions</span> -->
					<details>
						<summary class=" border-top-line py-6 px-4 flex ">
							<p class="text-base font-medium text-gray300">
								Solutions
							</p>
							<IonIcon :icon="chevronDownOutline" class="ml-2" />
						</summary>

						<div class="flex flex-col px-4">
							<p class=" pb-6 flex flex-col" @click="navigateTo('/forstudents')">
								<span class="font-bold flex items-center gap-2">For students <IonIcon :icon="chevronForwardCircleOutline" /></span>
								<span>Class collaboration and study tools</span>
							</p>
							<p class=" pb-6 flex flex-col" @click="navigateTo('/forschools')">
								<span class="font-bold flex items-center gap-2">For lecturers<IonIcon :icon="chevronForwardCircleOutline" /></span>
								<span>Course and student management</span>
							</p>
						</div>
					</details>

					<a class="border-top-line py-6 px-4" href="https://upload.stranerd.com/" target="_blank" rel="noopener noreferrer">Upload</a>
					<span class="border-top-line py-6 px-4" @click="navigateTo('/pricing')">Pricing</span>
					<span class="border-top-line py-6 px-4" @click="navigateTo('/about')">About</span>
				</div>
			</div>
	

			<div class="lg:flex items-center justify-between gap-12 text-base hidden">
				<span>Solutions</span>
				<a href="http://" target="_blank" rel="noopener noreferrer">Upload</a>
				<router-link to="/pricing">Pricing</router-link>
				<router-link to="/about">About</router-link>
				<!-- <span>Contact</span> -->
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
	</IonHeader>
</template>

<script lang="ts" setup>
import { menuOutline, closeOutline, chevronDownOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import {ref} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const show = ref(false)
const toggleMenu = ()=> show.value = !show.value
const navigateTo = (route)=>{
	router.push(route)
	show.value = false
}
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
details {
  user-select: none;
   & summary svg.turn {
	    color: #C0C0C0;
   }
}
details[open] {
  & summary svg {
	  color: #000;
  }
  & summary ion-icon{
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
