<template>
  <div>
    <div
      class="h-42 flex flex-col justify-start bg-cover px-5 py-5 text-justify"
      style="
        background-image: url('https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
      "
    >
      <h1 class="font-Quicksand text-8xl font-black text-white">
        <RouterLink to="/"> GUIOS-READS </RouterLink>
      </h1>

      <div class="mx-4 flex flex-wrap items-center justify-between py-3">
        <!-- tipologia-->
        <div
          class="flex items-center justify-start gap-3 rounded-md py-1 px-2 font-Quicksand text-xl leading-loose tracking-wide text-white sm:flex-wrap sm:text-3xl"
        >
          <div
            class="rounded-xl px-5 py-3 font-extrabold text-white backdrop-brightness-200 backdrop-invert sm:text-black md:text-black"
          >
            <RouterLink to="/read/"> Read </RouterLink>
          </div>
          <div
            class="border-r-2 border-l-2 border-dashed border-amber-200 px-5 py-1"
          >
            <RouterLink to="/reading/"> Reading</RouterLink>
          </div>
          <div>
            <RouterLink to="/wanted/"> Want to read</RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- BOOK LIST -->
    <div class="bg-[url('/images/bg-book-vintage.jpeg')] bg-cover">
      <div v-if="bookInfo">
        <div
          class="container mx-auto grid h-full gap-6 p-10 py-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <div v-for="book in bookInfo" :key="book">
            <div
              class="flex flex-col items-center rounded-2xl border-2 border-[#bf9b6f] bg-[#d6bea1]"
            >
              <div class="my-5">
                <img
                  v-if="book.cover"
                  :src="book.cover"
                  alt="books images"
                  class="h-56"
                />
              </div>

              <div class="mx-5 py-2 text-justify">
                <p class="text-md font-bold md:text-lg">
                  {{ book.title }}
                </p>
                <div v-for="author in book.authors" :key="author">
                  <p class="text-md italic md:text-lg">{{ author }}</p>
                </div>
                <div v-if="book.description">
                  <p class="text-sm md:text-base">
                    {{ shortDescription(book.description) }}
                  </p>
                </div>
              </div>
              <div class="flex gap-3 p-5">
                <button
                  @click="moveToReading(book.id)"
                  class="rounded-full px-2"
                >
                  <i
                    class="fa-solid fa-book-open-reader fa-xl transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    style="color: #6e493a"
                  ></i>
                </button>
                <button @click="removeFromRead(book.id)">
                  <i
                    class="fa-solid fa-trash-arrow-up fa-xl transition delay-75 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="flex flex-col items-center gap-3 bg-[#281a05] p-4 sm:p-6">
    <div class="flex items-center justify-center gap-3 text-center">
      <p class="text-md text-white sm:text-xl">Front-End Developer Course by</p>
      <p class="text-3xl text-[#404cec]">Codeop</p>
    </div>

    <div class="mt-3 flex items-center gap-4 text-sm dark:text-white sm:mt-0">
      <div
        class="flex justify-between text-center font-Updock text-3xl text-white"
      >
        Guiomar Castro
      </div>
      <a
        href="https://linkedin.com/in/blanca-guiomar-castro-gonzález-05b69971"
        class="text-white hover:underline"
        ><i class="fa-brands fa-linkedin fa-2xl"></i
      ></a>
    </div>
  </footer>
</template>

<script>
import axios from "axios";
import { addBook, getBooks, removeBook, getABook } from "../firebase";
export default {
  name: "Home",
  data() {
    return {
      bookInfo: null,
      searchInput: null,
    };
  },
  components: {},
  methods: {
    async getBooks() {
      if (this.searchInput === "") {
        this.bookInfo = null;
        return;
      }

      try {
        const { data } = await axios(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.searchInput}"|inauthor:"${this.searchInput}"&maxResults=30`
        );
        this.bookInfo = data;
      } catch (error) {
      } finally {
      }
    },
    async showReadBooks() {
      try {
        this.bookInfo = await getBooks("read");
      } catch (error) {
        console.log("error");
      }
    },
    removeFromRead(id) {
      removeBook(id, "read");
      this.showReadBooks();
    },
    shortDescription: (textito) => {
      return typeof textito === "string"
        ? textito.split("").slice(0, 150).join("") + "..."
        : "sin descripción";
    },
    async moveToReading(id) {
      try {
        const book = await getABook(id, "read");
        console.log(book);
        addBook(id, "reading", book);
        this.removeFromRead(id);
      } catch (error) {
        console.log("Error getting a book");
      }
    },
  },
  mounted() {
    this.showReadBooks();
  },
};
</script>

<style></style>
