<script setup>
import {inject} from "vue";
import {useRouter} from 'vue-router'
const $thumpi = inject('$thumpi')

const router = useRouter()

const toLink = function (link) {
  $thumpi.route(router, link);
}

const save = () => {
  $thumpi.saveDocs();
}
</script>
<template>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" @click="toLink('/')">Thumpi</a>
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
              >Documents</a>
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
          <li className="nav-item">
            <a
                class="nav-link"
                @click="save()"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
            >Save</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
