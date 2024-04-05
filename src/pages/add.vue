<template>
  <q-page>
    
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
    <q-input filled v-model="diaryForm.date" mask="date" :rules="['date']" label="选择日期 *">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="diaryForm.date" today-btn>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

      <q-input
        filled
        v-model="diaryForm.title"
        label="标题 *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || '输入标题！！']"
      />
      <q-input
      label="正文 *"
      v-model="diaryForm.content"
      filled
      autogrow
      type="textarea"
    />
    <q-btn color="primary" label="提交" @click="submit"/>
      
</q-form>

  </q-page>
</template>

<script setup>
import {getCurrentDateStr} from '../utils/date'
import { useQuasar } from 'quasar'
import { ref,reactive,toRaw } from 'vue'
import { useRouter } from 'vue-router';
import {useDiaryStore} from '../stores/diary.js'
let diaryStore = useDiaryStore()
let router = useRouter()
defineOptions({
  name: 'IndexPage'
});

const diaryForm = reactive({
  date:getCurrentDateStr(),
  title:'',
  content:''
})

function submit() {
  diaryStore.addDiary(toRaw(diaryForm))
  router.push('/')
}
</script>
