<template>
	<div class="">
		<div class="text-sm font-bold flex items-center justify-between mb-4">
			 <IonText>All students</IonText>
			 <IonText>Classes attended</IonText>
		</div>

		<StudentCard name="Chiamaka Ndukwe"/>
		<StudentCard name="Tony Ndicka"/>
		<StudentCard name="Adeyemi Kareem"/>
		<StudentCard name="Yinka Bonucci"/>
		<StudentCard name="Wisdom Omole"/>
		<StudentCard name="Chiamaka Ndukwe"/>
		<StudentCard name="Tony Ndicka"/>
		<StudentCard name="Adeyemi Kareem"/>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StudentCard from './studentCard.vue'


export default defineComponent({
	name: 'studentTab',
	components: { StudentCard },
	setup (props) {
	
		return {
			
		}
	}
})
</script>