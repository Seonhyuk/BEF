<template>
  <div>
    <!-- 컴포넌트로 네브바 사용하려고 했는데 라우터링크에서 인자넘기는게 안먹음 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <div class="container-fluid">
        <div>
          <router-link to="/">
            <a class="navbar-brand">
            <img src="@/assets/logo.png" alt="" width="270" height="270">
          </a>
          </router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/nyear">
                <a class="nav-link active text-white" aria-current="page" href="#">연도별추천작</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="{ name: 'profile', params:{ username:`${currentUser.username}`} }">
                <a class="nav-link active text-white" aria-current="page" href="#">프로필</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/roundselect">
                <a class="nav-link active text-white" aria-current="page" href="#">월드컵</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/community">
                <a class="nav-link active text-white" aria-current="page" href="#">커뮤니티</a>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                MY
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
          <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>    
  </div>
</template>

<script>

export default {
  name:'NavBar',
}
</script>

<style>

</style>