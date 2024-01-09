<script>
export default {
  data() {
    return {
      objPlayMovies: [],
      objComeMovies: [],
      itemsPerSlide: 3, // 每頁顯示的輪播項目數量
    };
  },
  computed: {
    playPerPage() {
      let chunks = [];
      for (let i = 0; i < this.objPlayMovies.length; i += this.itemsPerSlide) {
        chunks.push(this.objPlayMovies.slice(i, i + this.itemsPerSlide));
      }
      return chunks;
    },
    comePerPage() {
      let chunks = [];
      for (let i = 0; i < this.objComeMovies.length; i += this.itemsPerSlide) {
        chunks.push(this.objComeMovies.slice(i, i + this.itemsPerSlide));
      }
      return chunks;
    },
},
  methods: {
    async getPlayMovie() { //上映中
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      let page = 1;
      let count = 30; //要抓的電影數
      let playingMovies = [];

      try {
        const nowDate = new Date();
        const twoMonth = new Date();
        twoMonth.setMonth(nowDate.getMonth() - 2);

        while (playingMovies.length < count) {
          const api = `https://api.themoviedb.org/3/movie/now_playing?language=zh-TW&page=${page}`;
          const response = await fetch(api, options);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const moviesOnPage = data.results.filter((movie) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate >= twoMonth && releaseDate <= nowDate;
          });
          playingMovies = playingMovies.concat(moviesOnPage);
          if (page < data.total_pages) {
            page++;
          } else {
            break;
          }
        }
        const playMovies = playingMovies.slice(0, count);
        this.objPlayMovies = playMovies;
        console.log('上映中 PlayMovies:', this.objPlayMovies);
      } catch (error) {
        console.error(error);
      }
    },
    async getComeMovie() { //即將上映
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      let page = 1;
      let count = 30; //要抓的電影數
      let comingMovies = [];

      try {
        const nowDate = new Date();
        const oneMonth = new Date();
        oneMonth.setMonth(nowDate.getMonth() + 1);

        while (comingMovies.length < count) {
          const api = `https://api.themoviedb.org/3/movie/upcoming?language=zh-TW&page=${page}`;
          const response = await fetch(api, options);

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const moviesOnPage = data.results.filter((movie) => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate >= nowDate && releaseDate <= oneMonth;
          });
          comingMovies = comingMovies.concat(moviesOnPage);
          if (page < data.total_pages) {
            page++;
          } else {
            break;
          }
        }
        // 截取前 count 筆資料
        const comeMovies = comingMovies.slice(0, count);
        this.objComeMovies = comeMovies;
        console.log('即將上映 ComeMovies:', this.objComeMovies);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.getPlayMovie();
    await this.getComeMovie();
  },
};
</script>

<template>
<span>近期上映電影</span>
<div class="container mt-5">
    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(itemsChunk, index) in playPerPage" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
          <div class="row">
            <div v-for="(item, innerIndex) in itemsChunk" :key="innerIndex" class="col-md-4">
              <a>
                <RouterLink to="MovieComment">
                  <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" class="d-block w-100" alt="Slide {{innerIndex + 1}}">
                </RouterLink>
              </a>
              <div class="carousel-caption d-none d-md-block">
                <h5>{{ item.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

<span>熱映中電影</span>
<div class="container mt-5">
    <div id="carouselExample1" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(itemsChunk, index) in comePerPage" :key="index" :class="['carousel-item', index === 0 ? 'active' : '']">
          <div class="row">
            <div v-for="(item, innerIndex) in itemsChunk" :key="innerIndex" class="col-md-4">
              <a>
                <RouterLink to="MovieComment">
                  <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" class="d-block w-100" alt="Slide {{innerIndex + 1}}">
                </RouterLink>
              </a>
              <div class="carousel-caption d-none d-md-block">
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample1" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample1" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

<span>為你推薦</span>


<span>分類選擇</span>


</template>

<style lang="scss">
span, button, p, label, select {
  font-family: "Montserrat", sans-serif, sans-serif, "M PLUS 1";
  color: #557;
  font-size: 50px;
}
</style>
