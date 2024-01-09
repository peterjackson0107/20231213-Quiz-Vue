<script>
export default {
  data() {
    return {
      objPlayMovies: [],
      objComeMovies: [],
      objPlayPerson: [],
      objComePerson: [],
    };
  },
  computed: {
    // ...mapState(data, ["objP", "objC", "objPData", "objCData"]),
    sortedComments() {
      //篩選留言
      const sorted = this.comments.slice();
      switch (this.sortOrder) {
        case "latest":
          return sorted.sort((a, b) => b.timestamp - a.timestamp);
        case "likes":
          return sorted.sort((a, b) => b.likes - a.likes);
        default:
          return sorted.sort();
      }
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
      let count = 2; //要抓的電影數
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
      let count = 2; //要抓的電影數
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
    getPlayPerson(movieId) { //上映中 演員*5 + 導演*1
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      // fetch(`https://api.themoviedb.org/3/movie/1029575/credits?language=en-US`, options)
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
        .then((response) => response.json())
        .then((response) => {
          const directors = response.crew.filter(
            (person) => person.job === "Director"
          );
          const cast = response.cast.slice(0, 5);
          console.log(directors);
          console.log(cast);

          let playPeople = [];
          playPeople.push(directors);
          playPeople.push(cast);
          this.objPlayPerson.push(playPeople);
          // console.log('最後的人員 comingPeople', playPeople);
          console.log('全部電影的上映中 演員 objPlayPerson', this.objPlayPerson);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getComePerson(movieId) { //即將上映 演員*5 + 導演*1
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      // fetch(`https://api.themoviedb.org/3/movie/1029575/credits?language=en-US`, options)
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
        .then((response) => response.json())
        .then((response) => {
          const directors = response.crew.filter(
            (person) => person.job === "Director"
          );
          const cast = response.cast.slice(0, 5);
          console.log(directors);
          console.log(cast);

          let comePeople = [];
          comePeople.push(directors);
          comePeople.push(cast);
          this.objComePerson.push(comePeople);
          // console.log('最後的人員 comePeople', comePeople);
          console.log('全部電影的即將上映 演員 objComePerson', this.objComePerson);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPlayTrailer(movieId) { //上映中 預告片
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      // fetch(`https://api.themoviedb.org/3/movie/1029575/videos?language=en-US`, options)
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        .then((response) => {
          const firstTrailerKey = response.results.find( (video) => video.type === "Trailer" )?.key;

          const trailerLink = `https://www.youtube.com/watch?v=${firstTrailerKey}`;

          console.log('PlayTrailerLink', trailerLink);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getComeTrailer(movieId) { //即將上映 預告片
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTBiNGVhYWYyMjVhZTdmYzFhNjdjYzk0ODk5Mjk5OSIsInN1YiI6IjY1N2ZjYzAzMGU2NGFmMDgxZWE4Mjc3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3d6GcXTBf2kwGx9GzG7O4_8eCoHAjGxXNr9vV1lVXww",
        },
      };

      // fetch(`https://api.themoviedb.org/3/movie/1029575/videos?language=en-US`, options)
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        .then((response) => {
          const firstTrailerKey = response.results.find( (video) => video.type === "Trailer" )?.key;

          const trailerLink = `https://www.youtube.com/watch?v=${firstTrailerKey}`;

          console.log(response);
          console.log(trailerLink);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    
    
  },
  async mounted() {
    await this.getPlayMovie();
    await this.getComeMovie();

    for (const item of this.objPlayMovies) {
    await this.getPlayPerson(item.id);
  }

  for (const item of this.objComeMovies) {
    await this.getComePerson(item.id);
  }

  //   setTimeout(() => {
  //   this.objPlayMovies.forEach((item) => {
  //     this.getPlayPerson(item.id);
  //     // this.getPlayTrailer(item.id);
  //   });
  // }, 3000);
  //   setTimeout(() => {
  //   this.objComeMovies.forEach((item) => {
  //     this.getComePerson(item.id);
  //     // this.getComeTrailer(item.id);
  //   });
  // }, 3000);
  },
};
</script>

<template>
<!-- 電影資料 -->
  <div class="movieData">
  <button type="button"  @click="getPlayMovie()">按我看正在上映</button>
  <button type="button" @click="getComeMovie()">按我看即將上映</button>
  
    <table border="1" style="width: 60vw; margin: auto; color: #557">
      <thead style="background-color: rgb(194, 190, 190)">
        <th>id</th>
        <th>海報</th>
        <th>原文名稱</th>
        <th>名稱</th>
        <th>簡介</th>
        <th>上映日期</th>
        <th>導演</th>
        <th>演員</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) of this.objPlayMovies" :key="index">
          <td>{{ item.id }}</td>
          <td>
            <!-- w92/w154/w185/w342/w500/original(原圖大小) -->
            <img :src="'https://image.tmdb.org/t/p/w92' + item.poster_path" alt="Movie Poster"/> 
          </td>
          <td>{{ item.original_title }}</td>
          <td>{{ item.title }}</td>
          <td class="font state" v-if="item.overview === ''">此電影無簡介</td>
          <td class="font state" v-if="item.overview !== ''">{{ item.overview }}</td>
          <td>{{ item.release_date }}</td>
          <td>
            <div v-for="(item, index1) of this.objPlayPerson" :key="index1">
              {{ item.original_name }}
            </div>
          </td>
          <td>
            <div v-for="(item, index2) of this.objPlayPerson" :key="index2">
              {{ item.original_name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>
</template>

<style lang="scss">
span, button, p, label, select {
  font-family: "Montserrat", sans-serif, sans-serif, "M PLUS 1";
  color: #557;
  font-size: 18px;
}

small {
  font-family: "Montserrat", sans-serif, sans-serif, "M PLUS 1";
  color: #557;
}

span, button {
  margin: 10px 10px 10px 0;
}
.col-md-8 {
  width: 50vw;
  margin: 0 auto;
  align-items: start;
  justify-content: start;
  text-align: start;
}
.card {
  margin-bottom: 10px;

  .card-body {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-link {
    padding: 0;
    margin-right: 10px;
    cursor: pointer;
  }

  .btn-primary, .btn-outline-primary {
    margin-right: 10px;
  }

  .text-muted {
    margin-left: auto;
  }

  textarea {
    resize: vertical;
  }

  .mt-2 {
    margin-top: 10px;
  }
}
</style>
