<template>
	<div class="main">
		<Time />
		<div class="user-message">{{ $auth.user.name }}さんお疲れ様です</div>
		<Button
		:work="work"
		:rest="rest"
		@update-work="updateWork"
		@update-break="updateBreak"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			work: {
				work_start: '',
				work_end: ''
			},
			rest: {
				break_start: '',
				break_end: ''
			},
		};
	},
	methods: {
		async getWorkData() {
			try {
				const { data } = await this.$axios.post('http://localhost/api/auth/work_index', {
					user_id: this.$auth.user.id,
				});
				this.work = data.work;
			} catch (error) {
				if (error.response && error.response.data && error.response.data.error) {
					alert(`勤務時間の取得に失敗しました: ${error.response.data.error}`);
				} else {
					alert('予期せぬエラーが発生しました');
				}
			}
		},
		async getRestData() {
			try {
				const { data } = await this.$axios.post('http://localhost/api/auth/break_index', {
					user_id: this.$auth.user.id,
				});
				this.rest = data.rest;
			} catch (error) {
				if (error.response && error.response.data && error.response.data.error) {
					alert(`休憩時間の取得に失敗しました: ${error.response.data.error}`);
				} else {
					alert('予期せぬエラーが発生しました');
				}
			}
		},
		updateWork(newWork) {
			this.work = newWork;
		},
		updateBreak(newBreak) {
			this.rest = newBreak;
		},
	},
	created() {
		this.getWorkData();
		this.getRestData();
	}
};
</script>

<style scoped>
.main {
	text-align: center;
}

.user-message {
	font-size: xx-large;
	margin-bottom: 0.5rem;
}

@media screen and (max-width: 820px) {
	.user-message {
		font-size: x-large;
	}
}

@media screen and (max-width: 431px) {
	.user-message {
		font-size: larger;
	}
}

@media screen and (max-width: 321px) {
	.user-message {
		font-size: medium;
	}
}
</style>
