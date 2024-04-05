<template>
  <q-page v-if="false">
    <q-btn round color="primary" @click="router.push('/add')">添加</q-btn>
    共1条日记
    <q-list>
      <q-item clickable>
        <q-item-section>
          <q-item-label>日记0328</q-item-label>
          <q-item-label caption lines="2">这是日记内容。。。这是日记内容。。。这是日记内容。。。</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>2023-3-28</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Voted!</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
            elit.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-badge color="teal" label="10k" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </q-list>
  </q-page>

  <q-page>
    <q-file filled bottom-slots v-model="importJson" label="选择日记.ed文件" counter max-files="1"
      @update:model-value="onFileChange" class="q-pa-md">
      <template v-slot:before>
        <q-icon name="folder_open" />
      </template>

      <template v-slot:hint>
        共{{ diaryStore.diaries.length }}条日记
      </template>
    </q-file>

    <q-splitter v-model="splitterModel" :horizontal="true" class="q-pa-md flex center">

      <template v-slot:before>
        <q-date v-model="selectedDate" :events="events" event-color="orange" @update:model-value="onClickDate"
          style="width: 100%;" :locale="myLocale" />

      </template>
      <template v-slot:after class="diaryContent">

        <template v-if="currentDiary.content !== ''">
          <!-- <pre>
          {{ 
            toRaw(diaryStore.diaries) }}
        </pre> -->
          <div class="title">
            <span> {{ currentDiary.title }}</span>
            <q-btn
          flat
          dense
          round
          @click="del"
          label="删除"
        />
          </div>
          <p class="date">{{ currentDiary.date }}</p>
          <p class="content">{{ currentDiary.content }}</p>
        </template>
        <template v-else>
          <div class="noDiary">
            <div>暂无日记</div>
          <q-btn round color="primary" @click="router.push('/add')">添加</q-btn>
          </div>
          
        </template>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, toRaw, reactive, onMounted } from 'vue'
import { useDiaryStore } from '../stores/diary.js'
import { getCurrentDateStr, myLocale } from '../utils/date'
let importJson = ref(null)
let diaryStore = useDiaryStore()

async function onFileChange() {
  const file = importJson.value;
  if (!file || !file.name.endsWith(".ed")) {
    alert("请选择一个 .ed 文件");
    return;
  }

  const jsonData = await file.text();
  let diaryList = JSON.parse(jsonData)['data'];
  console.log("已解析:", diaryList);
  diaryStore.diaries = diaryList
  selectedDate.value = diaryStore.diaries[diaryStore.diaries.length - 1].date
  onClickDate()
}
function del() {
  diaryStore.deleteDiary(currentDiary.index)
  resetCurrentDiary()
}

let router = useRouter()

let splitterModel = ref(50)
let selectedDate = ref(getCurrentDateStr())
let currentDiary = reactive({
  title: '',
  date: '',
  content: '',
  index:''
})

let events = computed(() => {
  let dateArr = []
  diaryStore.diaries.forEach(item => {
    if (item.content !== '') {
      dateArr.push(item.date)
    }

  })
  return dateArr
})

function onClickDate() {
  let date = selectedDate.value
  let index = diaryStore.diaries.findIndex(item => item.date === date)
  if (index !== -1) {
    currentDiary.title = diaryStore.diaries[index].title
    currentDiary.date = diaryStore.diaries[index].date
    currentDiary.content = diaryStore.diaries[index].content
    currentDiary.index = index

  } else {
    resetCurrentDiary()
  }
  console.log(currentDiary);
}

function resetCurrentDiary() {
  currentDiary.title = ''
    currentDiary.date = ''
    currentDiary.content = ''
    currentDiary.index = ''
}

onMounted(() => {
  onClickDate()
})
defineOptions({
  name: 'IndexPage'
});
</script>

<style lang="scss">
.diaryContent{
  display: flex;
  
}
.noDiary{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
  }
.title{
  font-weight:bold;
  font-size: 18px;
  display: flex;
    justify-content: space-between;
    align-items: center;
}
.date{
  color: #ccc;
}
.content{
  width:100%;
  background-color: #e4e4e4;
}
</style>
