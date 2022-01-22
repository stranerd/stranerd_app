<template>
	<AdminWrapper>
		<div class="mb-12">
			<div class="flex items-start w-full">
				<ion-input class="bg-white border border-faded_gray !m-0 !p-0 w-full left-2" placeholder="Enter detail to make user an admin"/>
				<ion-button class="btn-primary relative right-2 z-50 !m-0 !p-0">
					Make Admin
				</ion-button>
			</div>


			<div v-for="(person) in 5" :key="person"
				class="flex items-center justify-between mt-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6"
			>
		
				<div class="w-8/12 flex items-center gap-2">
					<avatar :id="person.id" :size="24" :src="person.avatar" color="#64778A" />
					<span>En-Kay Williams</span>
				</div>
				<div class="w-3/12 font-bold text-right text-delete_red cursor-pointer">
					<span>Remove</span>
				</div>
			</div>

		</div>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@root/application/components/admin/AdminWrapper.vue'


export default defineComponent({
	name: 'AdminPage',
	displayName: 'Administration',
	components: {
		AdminWrapper,

	}
})
</script>


<style scoped>
ion-button{
    --padding-top: 1.7rem !important;
    --padding-bottom: 1.7rem !important;
}

ion-input{
       --padding-top: 1rem !important;
    --padding-bottom: 0.8rem !important;
}
</style>