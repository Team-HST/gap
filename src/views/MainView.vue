<template>
  <div class="reponsive">
    <v-responsive :aspect-ratio="16/9" align="center">
      <div class="spiner-area">
        <RingLoader :loading="loading" :color="color" :size="size"></RingLoader>
      </div>
      <v-row 
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
import RingLoader from 'vue-spinner/src/RingLoader.vue';

export default {
  name: 'MainView',
  components: {
    RingLoader
  },
  data: () => ({
    isSelecting: false,
    loading: false,
    color: '#00ffcc',
    size: '150px',
    margin: '2px',
    radius: '100%'
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
      document.getElementsByClassName("black-overlay")[0].style.display = "block";
      this.loading = true
    },
    analyze(text) {
      this.beforeAnalyze();

      const result = [];
      const dataList = text.split('\n');
      let normalizer;
      for (let data of dataList) {
        try {
          let gaData = JSON.parse(data);
          let pos = gaData['gp'];
          let ts = gaData['ts']; 
          if (!normalizer) {
            normalizer = ts;
          }
          if (pos && ts) {
            const viewData = {ts, x: pos[0], y: 1-pos[1], value: 1};
            this.normalizeTimestamp(viewData, normalizer);
            result.push(viewData);
          }
        } catch (err) {
          // ignore
        }
      }
      setTimeout(() => {
        this.afterAnalyze(result);
      }, 1000)
    },
    normalizeTimestamp(data, normalizer) {      
      data.ts = Math.ceil((data.ts - normalizer) / 1000000);
    },
    afterAnalyze(result) {
      this.loading = false;
      document.getElementsByClassName("black-overlay")[0].style.display = "none";
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

.black-overlay {
  display: none;
	position: fixed;
	top: 0%;
	left: 0%;
	width: 100%;
	height: 100%;
	background-color: black;
	z-index:1001;
	-moz-opacity: 0.8;
	opacity:.80;
	filter: alpha(opacity=80);
}

.spiner-area {
  position: fixed;
  z-index: 1003;
  top: 30%;
  left: 45%;
}
</style>