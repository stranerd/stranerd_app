<template>
	<router-link :to="`/users/${user.id}`" class="flex card-sm card-padding items-center">
		<Avatar :id="user.id" :name="user.bio.fullName" :size="60" :src="user.bio.photo" />
		<div class="flex flex-col flex-1">
			<IonText class="font-bold flex gap-1 items-center">
				<span>{{ user.bio.fullName }}</span>
				<Verified :verified="user.isVerified" />
			</IonText>
			<template v-if="user.isCollege(user)">
				<Institution :institutionId="user.school.institutionId"
					class="text-secondaryText text-sm font-bold" />
				<Department :departmentId="user.school.departmentId" :facultyId="user.school.facultyId"
					class="text-secondaryText text-sm" />
			</template>
			<div class="flex items-center gap-4 w-full text-sm">
				<IonText v-for="{ count, label } in [
					{ label: pluralize(user.meta.questions, 'question', 'questions'), count: formatNumber(user.meta.questions) },
					{ label: pluralize(user.meta.flashCards, 'flashcard', 'flashcards'), count: formatNumber(user.meta.flashCards) },
					{ label: pluralize(user.score, 'pt', 'pts'), count: formatNumber(user.score, 1) }
				]" :key="label">
					<span class="font-bold">{{ count }}</span>
					<span>&nbsp;{{ label }}</span>
				</IonText>
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserEntity } from '@modules/users'
import Department from '@app/components/school/departments/Department.vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { formatNumber, pluralize } from '@utils/commons'

export default defineComponent({
	name: 'UserListCard',
	components: { Institution, Department },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup () {
		return { pluralize, formatNumber }
	}
})
</script>
