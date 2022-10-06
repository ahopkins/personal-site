<template>
  <section class="book">
    My book
    <a href="https://sanicbook.com">Python Web Development with Sanic</a>
    now available
  </section>
</template>

<style scoped>
.book {
  background-color: #ff0d68;
  color: #000000;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 3rem;
  font-size: 3rem;
}
.book a {
  color: #000000;
  font-weight: 700;
  text-decoration: underline;
}
.book a:hover {
  color: #111111;
  text-decoration: none;
}
@media (max-width: 800px) {
  .book {
    top: 0;
    bottom: initial;
  }
}
</style>
