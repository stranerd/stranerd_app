<template>
	<Justified>
		<div v-if="user">
			<div class="flex flex-col border-bottom-line gap-4 p-4">
				<div class="flex items-center gap-4">
					<Avatar :name="user.bio.fullName" :size="64" :src="user.bio.photo" />
					<div class="flex flex-col gap-2">
						<IonText class="text-heading font-bold flex gap-1 items-center">
							<span>{{ user.bio.fullName }}</span>
							<Verified :verified="user.isVerified" />
						</IonText>
						<template v-if="user.isCollege">
							<Institution :institutionId="user.school.institutionId"
								class="text-secondaryText text-sub font-bold" />
							<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
								class="text-secondaryText text-sub" />
						</template>
					</div>
				</div>
				<IonText v-if="user.bio.description" class="text-sub">{{ user.bio.description }}</IonText>
			</div>
			<div class="flex flex-col gap-6 px-4 py-8 text-sub text-secondaryText">
				<router-link class="flex gap-3 items-center" to="/account/stats">
					<IonIcon :icon="gridOutline" class="text-heading" />
					<span>Stats</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/questions">
					<IonIcon :icon="helpCircleOutline" class="text-heading" />
					<span>Questions</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/answers">
					<IonIcon :icon="readerOutline" class="text-heading" />
					<span>Answers</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/flashCards">
					<IonIcon :icon="flashOutline" class="text-heading" />
					<span>Flashcards</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/documents">
					<IonIcon :icon="documentTextOutline" class="text-heading" />
					<span>Documents</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/sets">
					<IonIcon :icon="bookmarkOutline" class="text-heading" />
					<span>Saved</span>
				</router-link>
				<router-link class="flex gap-3 items-center" to="/account/settings">
					<IonIcon :icon="settingsOutline" class="text-heading" />
					<span>Settings</span>
				</router-link>
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import {
	bookmarkOutline,
	documentTextOutline,
	flashOutline,
	gridOutline,
	helpCircleOutline,
	readerOutline,
	settingsOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'Account',
	components: { Justified, Department, Institution },
	displayName: 'Account',
	middlewares: ['isAuthenticated'],
	setup () {
		const { id, isAdmin, user } = useAuth()
		return {
			id, isAdmin, user,
			gridOutline, helpCircleOutline, readerOutline, flashOutline,
			documentTextOutline, bookmarkOutline, settingsOutline
		}
	}
})
</script>
