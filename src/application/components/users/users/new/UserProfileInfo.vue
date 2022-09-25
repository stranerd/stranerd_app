<template>
	<div class="mb-4 flex items-center">
		<img src="https://img.freepik.com/premium-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?w=2000" alt="" 
            class="w-[64px] h-[64px] rounded-full object-cover mr-3"
        />
        <div>
            <IonText class="text-sm font-bold mb-1 block">Professor Jerry Umar</IonText>
            <IonText class="text-xs font-bold text-secondaryText mb-1 block">University Of Lagos</IonText>
            <IonText class="text-xs text-secondaryText block">Sciences</IonText>
        </div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UserProfileInfo',
	components: {  },
	setup () {
        
		return {
            
		}
	}
})
</script>
