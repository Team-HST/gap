<template>
  <div class="reponsive">
    <v-responsive :aspect-ratio="16/9" align="center">
      <v-row id="spinnerArea" align="center" justify="center" style="margin-top: 20%; display: none; position: relative;">
        <v-progress-circular
          :size="100"
          :width="15"
          :rotate="360"
          color="teal"
          >
        </v-progress-circular>
      </v-row>
      <v-row 
        id="contentArea"
        class="mt-16"
        align="center" 
        justify="center">
          <v-col
            class="mt-16"
            cols="12"
            sm="8"
            md="4"
          >
            <v-img
              class="white--text align-end mt-16"
              width="320px" height="180px"
              src="@/assets/logo.png"
            >
            </v-img>
            <v-btn
              class="mt-16 white--text"
              color="grey darken-1"
              rounded
              depressed
              large
              :loading="isSelecting"
              @click="onButtonClick"
            >
              <v-icon left>mdi-cloud-upload</v-icon>
              분석 파일 선택 (.json)
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              @change="onFileChanged"
            >
          </v-col>
      </v-row>
      <!--
      <v-row align="center">
        <v-col cols="4"></v-col>
        <v-col cols="4" class="important" style="color:red;" align="center">※ .json 확장자 파일만 업로드 가능합니다.</v-col>
        <v-col cols="4"></v-col>
      </v-row>
      -->
    </v-responsive>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'MainView',
  data: () => ({
    isSelecting: false
  }),
  methods: {
    ...mapMutations(['setData']),
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
      document.getElementById("contentArea").style.display = "none";
      document.getElementById("spinnerArea").style.display = "block";
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
      document.getElementById("contentArea").style.display = "block";
      document.getElementById("spinnerArea").style.display = "none";
      this.setData(result);
      this.$router.push({
        name: 'VisualizerView', 
      });
    }
  }
}
</script>

<style>
.v-icon--left {
  margin-right: 8px;
}
div.cardRow {
  margin-top: 16%;
  background-color: rgba( 255, 255, 255, 0.1) !important;
}

div.important {
  color: red;
  font-weight: 600;
}

.text-none {
  background-color: orange !important;
  border-color: orange !important;
}

.progress-circular {
  margin: 1rem;
}
</style>