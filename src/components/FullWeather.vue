<template>
  <div>
    <p>
      <router-link to="/">На главную</router-link>
    </p>
    <label>Выбрать другой город
    <input v-model="otherCity" type="text">
    </label>
    <button @click="load">Загрузить</button>
    <div class="wrap">
      <div class="square" v-for="(weather, key) in this.fullWeather" :key="key">
        <p>{{ weather.dt_txt }}</p>
        <p>{{ weather.weather[0].description }}</p>
        <p>{{ weather.main.temp }}</p>
        <img :src="getImage(weather.weather[0].icon)">
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import config from "../config";

export default {
  name: 'FullWeather',
  components: {},
  mounted() {
    this.getForecast();
  },
  data() {
    return {
      otherCity: '',
      fullWeather: null,
      activeFullCity: this.$route.params.city,
    }
  },
  computed: {},
  methods: {
    getForecast() {
      console.log(this.activeCity);
      axios.get(`http://localhost:8080/data/2.5/forecast?q=${this.activeFullCity}&appid=${config.app_key}&lang=ru&units=metric`,)
          .then((response) => {
            this.fullWeather = response.data.list;
          }).catch(() => {
        this.$router.push(`/notfound`);
        this.activeCity = 'Минск';

      })
    },
    getImage(icon) {
      return `https://openweathermap.org/img/wn/${icon}@2x.png`
    },
    load() {
      this.activeFullCity = this.otherCity;
      this.$router.push(`${this.otherCity}`);
      this.getForecast();
    }

  },
}
</script>

<style>
.wrap {
  display: flex;
  flex-wrap: wrap;
}
.square {
  width: 100px;
  height: 100px;
  padding-bottom: 150px;
  border: 1px solid cadetblue;
}

</style>
