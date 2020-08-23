<template>
  <v-row align="center" justify="center">
    <v-col cols="12">
      <v-btn
        color="primary"
        class="text-none"
        rounded
        depressed
        :loading="isSelecting"
        @click="onButtonClick"
      >
        <v-icon left>mdi-cloud-upload</v-icon>
        분석할 파일을 선택하세요
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="onFileChanged"
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MainView',
  data: () => ({
    isSelecting: false
  }),
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true });
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const fileReader = new FileReader();      
      fileReader.onload = (event) => this.analyze(event.target.result);
      fileReader.readAsText(e.target.files[0]);
    },
    beforeAnalyze() {
      console.log('before analyze');
    },
    analyze(text) {
      this.beforeAnalyze();

      const result = [];
      const dataList = text.split('\n');
      for (let data of dataList) {
        try {
          let gaData = JSON.parse(data);
          let pos = gaData['gp'];
          if (pos) {
            result.push({x: pos[0] * 800, y: pos[1] * 600, v: 1});
          }
        } catch (err) {
          // ignore
        }
      }

      this.afterAnalyze(result);
    },
    afterAnalyze(result) {
      console.log('after analyze');
      this.$router.push({
        name: 'VisualizerView', 
        params: { data: result }
      });
    }
  }
}
</script>

<style>
.v-icon--left {
  margin-right: 8px;
}
</style>