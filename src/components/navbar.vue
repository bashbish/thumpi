<script setup>
import router from '@/router/index.js'
const toLink = function (link) {
  console.log(link)
  router.push(link)
}
</script>
<template>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#" @click="$router.push('/')">Thumpi</a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              class="nav-link"
              @click="toLink('/documents')"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              >Documents</a
            >
          </li>
          <li className="nav-item">
            <a
              class="nav-link"
              @click="toLink('/about')"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              >About</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
