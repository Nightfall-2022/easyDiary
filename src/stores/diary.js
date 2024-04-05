import { defineStore } from "pinia";
import { getCurrentDateStr } from "../utils/date";

// 我想开发一个日记管理软件,程序由vue3开发,主要功能是日记数据的增删改查,首先日记最终是存储在json文件里的,在日记管理软件里第一步就是选取json文件后导入日记数据,随后对日记数据进行增删改查操作,最后点击保存才将最后的更新结果导出成一个json文件.
// 所以请你用vue3的pinia做一个diary状态库,用于日记数据的增删改查,这个状态库包含了以下功能:
// 1.解析json文件的数据并转换成js的数据格式,首先弹出文件选择窗口,让用户只能选择.json文件,待用户选择了json文件后便解析json文件的数据,将数据保存到state的diaryList变量中
// 2.增加数据:即state的diaryList进行push操作
// 3.删除数据:按指定的时间字符串删除diaryList的数据
// 4.编辑数据:按指定的时间字符串编辑diaryList的数据
// 5.保存数据:将diaryList数据保存成一个json文件,其中json文件的文件名是当前时间_diaryData,例如2024-03-13 18:47:50_diaryData
// {
//   // data:[
// //   {
// //     "create_time":,
// //     "title":
// //     "content":
// //   }
// // ],
// update_time:''
// }

export const useDiaryStore = defineStore("diary", {
  state: () => ({
    diaries: [
      {
        // title: "",
        // date: getCurrentDateStr(),
        // content: "",
      },
    ],
  }),
  actions: {
    importDiary(file) {
      // 导入日记
      // 读取用户选取的json文件并更新日记数据
      // 示例代码：
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedDiaries = JSON.parse(e.target.result);
        this.diaries = importedDiaries;
      };
      reader.readAsText(file);
    },
    loadDiary() {
      // 读入日记
      // 当用户并没有导入日记时，从本地存储中获取日记数据
      // 示例代码：
      const localDiaries = localStorage.getItem("diaries");
      if (localDiaries) {
        this.diaries = JSON.parse(localDiaries);
      }
    },
    addDiary(diary) {
      // 新增日记
      // 将新的日记添加到日记数据中
      // 示例代码：
      let index = this.diaries.findIndex((item) => item.date === diary.date);
      if (index !== -1) {
        this.diaries[index].content = diary.content;
        this.diaries[index].title = diary.title;
      } else {
        this.diaries.push(diary);
      }
      this.saveDiary();
      console.log("已新增日记！，所有的日记：", this.diaries);
    },
    deleteDiary(index) {
      // 删除日记
      // 根据索引删除日记数据中的指定日记
      // 示例代码：
      this.diaries.splice(index, 1);
      this.saveDiary();
    },
    editDiary({ index, diary }) {
      // 编辑日记
      // 根据索引更新日记数据中的指定日记
      // 示例代码：
      this.diaries[index] = diary;
      this.saveDiary();
    },
    saveDiary() {
      // 保存日记
      // 将更新后的日记数据保存到本地存储中
      // 示例代码：
      localStorage.setItem("diaries", JSON.stringify(this.diaries));
    },
    async toJsonFile() {
      // 将日记数据导出成json文件
      const currentDate = getCurrentDateStr();
      const fileName = `${currentDate}_diaryData.ed`;
      const jsonContent = JSON.stringify(
        {
          data: this.diaries,
        },
        null,
        2
      );

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
