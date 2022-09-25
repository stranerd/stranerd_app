<template>
	<div class="">
		<div class="text-sm font-bold flex items-center justify-between mb-4">
			<IonText>Class held on</IonText>
			<IonText>Total attended</IonText>
		</div>
		<LogCard date="Tue, 26 July"/>
		<LogCard date="Tue, 26 July"/>
		<LogCard date="Tue, 26 July"/>
		<LogCard date="Tue, 26 July"/>
		<LogCard date="Tue, 26 July"/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LogCard from './logCard.vue'


export default defineComponent({
	name: 'logTab',
	components: { LogCard },
	setup (props) {
	
		return {
			
		}
	}
})
</script>
