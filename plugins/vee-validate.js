import Vue from 'vue'
import {
    ValidationProvider,
    ValidationObserver,
    extend,
    localize,
} from 'vee-validate'
import * as originalRules from 'vee-validate/dist/rules'
import ja from 'vee-validate/dist/locale/ja.json'

let rule
for (rule in originalRules) {
    extend(rule, {
        ...originalRules[rule],
    })
}

extend('time_format', value => {
    const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(value) || 'HH:MM:SS の形式で入力してください。';
});

localize('ja', ja)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
