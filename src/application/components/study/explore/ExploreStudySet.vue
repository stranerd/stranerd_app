<template>
	<div class="md:w-8/12 w-full px-4 mx-auto   mt-8">

		<template v-if="sets.length === 0">
			<div class="py-3">
				<empty-state
					info="No Study Set to Explore."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
				<SetCard  v-for="(set, index) in sets" :set="set" :key="set.id" colorClass="set" :index="index"/>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import SetCard from '@app/components/study/set/SetCard.vue'
import { onBeforeUnmount, onMounted } from 'vue'
import { useSetList } from '@app/composable/study/sets'


export default {

	components: {  SetCard },

      	setup () {
		// const { id, isLoggedIn } = useAuth()
		const { sets, listener, loading, error } = useSetList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			sets,
		}
	}
}
</script>

<style scoped>


.segment-button-checked{
    color: white !important
}
ion-select{
   --background: #F7F7FC;  
   background: #F7F7FC;  
   --padding-start: 1rem;
   --padding-end: 1rem;
}
ion-segment{
    --background: #F7F7FC;
    color: #8B9EB1;
    font-weight: bold;
}
ion-segment-button{
    --background-checked: #4D5C6F;
    --background-focused: #4D5C6F;
    --indicator-color: #4D5C6F;
    --indicator-box-shadow:none;
    --padding-top:0.5rem;
    --padding-bottom:0.5rem;
    color: #8B9EB1;
    font-weight: bold;
}
</style>