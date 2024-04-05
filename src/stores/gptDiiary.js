import { defineStore } from "pinia";

export const diaryStore = defineStore({
  id: "diary",
  state: () => ({
    diaryList: [],
  }),
  actions: {
    async selectAndParseJsonFile() {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
      fileInput.click();

      fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file || !file.name.endsWith(".json")) {
          alert("请选择一个 .json 文件");
          return;
        }

        const jsonData = await file.text();
        this.diaryList = JSON.parse(jsonData);
        console.log("已解析:", this.diaryList);
      };
    },
    addDiary(diary) {
      /* 
        diary:{
          title:str,
          content:str,
          create_time:str
        }
      */
      this.diaryList.push(diary);
      console.log("日记已添加:");
      console.log(this.diaryList);
    },
    deleteDiary(time) {
      this.diaryList = this.diaryList.filter((diary) => diary.time !== time);
    },
    editDiary(time, updatedDiary) {
      const index = this.diaryList.findIndex((diary) => diary.time === time);
      if (index !== -1) {
        this.diaryList[index] = updatedDiary;
      }
    },
    async saveDiary() {
      const currentDate = new Date()
        .toISOString()
        .replace(/[-:]/g, "")
        .replace("T", " ")
        .slice(0, 19);
      const fileName = `${currentDate}_diaryData.json`;
      const jsonContent = JSON.stringify(this.diaryList, null, 2);

      const blob = new Blob([jsonContent], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      URL.revokeObjectURL(url);
    },
  },
});
