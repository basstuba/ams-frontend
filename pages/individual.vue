<template>
    <div class="individual">
        <h2 class="individual-title">個別登録</h2>
        <div class="individual-content">
            <validation-observer ref="obs" v-slot="ObserverProps">
                <form class="individual-form" @submit.prevent="ObserverProps.handleSubmit(registration)">
                    <validation-provider v-slot="{ errors }" rules="required|max:20">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationName">氏名</label>
                            <input class="item-input" type="text" id="registrationName" v-model="name" name="氏名"
                                placeholder="氏名を入力してください">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|email">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationEmail">メールアドレス</label>
                            <input class="item-input" type="email" id="registrationEmail" v-model="email" name="メールアドレス"
                                placeholder="メールアドレスを入力してください">
                        </div>
                        <div>&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|min:8">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationPassword">パスワード</label>
                            <input class="item-input" type="text" id="registrationPassword" v-model="password"
                                name="パスワード" placeholder="パスワードを入力してください">
                        </div>
                        <div>&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|regex:/^\d{5}$/">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationNumber">社員番号</label>
                            <input class="item-input" type="text" id="registrationNumber" v-model="number" name="社員番号"
                                placeholder="社員番号を入力してください">
                        </div>
                        <div>&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationRole">社員区分</label>
                            <select class="item-select" id="registrationRole" v-model="Role" name="社員区分">
                                <option value="" disabled selected>選択してください</option>
                                <option v-for="role in roles" :key="role.id" :value="role.name">
                                    {{ role.name }}
                                </option>
                            </select>
                        </div>
                        <div>&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationDepartment">所属部門</label>
                            <select class="item-select" id="registrationDepartment" v-model="department" name="所属部門">
                                <option value="" disabled selected>選択してください</option>
                                <option v-for="department in departments" :key="department.id" :value="department.name">
                                    {{ department.name }}
                                </option>
                            </select>
                        </div>
                        <div>&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <button class="individual-form__button" type="submit">登録</button>
                </form>
            </validation-observer>
        </div>
    </div>
</template>