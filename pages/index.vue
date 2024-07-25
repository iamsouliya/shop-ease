<script lang="ts" setup>
interface Movie {
  id: string
  title: string
  genre: string
  rating: number
}
const getMoviesQuery = `
    query {
      movies {
        id
        title
        genre
        rating
      }
    }
  `
const { nhost } = useNhost()
const movies = shallowRef<Movie[]>([])
async function getMovies() {
  const { data } = await nhost.graphql.request(getMoviesQuery)
  movies.value = data.movies
}
onMounted(() => {
  getMovies()
})
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.rating }}</td>
        </tr>
      </tbody>
    </table>
    <Button>
      Hello
    </Button>
  </div>
</template>
