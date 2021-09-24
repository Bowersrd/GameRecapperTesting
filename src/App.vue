<template>
  <div id="app">
    <nav class="nav-bar">
      <div class="nav-bar__logo">
        <img src="@/assets/images/gamerecapper/main_logo.png" alt="Main logo">
      </div>
      <ul class="nav-bar__list">
        <li class="nav-bar___item">
          <router-link to="/" exact class="nav-bar__link">Home</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/recaps/game/001" exact class="nav-bar__link">Recaps</router-link>
        </li>
        <li class="nav-bar__item">
          <router-link to="/graphics/" class="nav-bar__link">Graphics</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  data() { 
    return {}
  }
}
</script>

<style lang="scss">
@import "@/assets/fonts/_Roboto.scss";
@import "@/assets/scss/main.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

html {
  font-size: 62.5%;
}

body {
  background-color: $color-primary-gray;
}

.nav-bar {
  position: relative;
  width: 100%;
  height: 8rem;
  background-color: $color-primary-4;
  color: $color-primary-light;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  box-shadow: 0px 0px 6px 0px $color-primary-4;
  z-index: 9999;
  &__logo {
    margin-left: 3rem;
    & img {
      height: 4rem;
    }
  }
  &__list {
    display: flex;
    list-style: none;
    margin-right: 5rem;
  }
  &__item {
    margin-left: 2rem;
  }
  &__link {
    color: $color-primary-light;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 1.6rem;
  }
}

.router-link-active {
  padding-bottom: .5rem;
  border-bottom: 2px solid $color-primary-gray;
  font-weight: 700;
  color: $color-primary-0;
}

.section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  padding-top: 8rem;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  padding: 0 3rem;
  background: $color-primary-gray;
}

.content-wrapper {
    width: 100%;
    height: calc(100vh - 8rem);
    display: flex;  
}

.btn {
  padding: 1.5rem 4rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  background: $color-primary-4;
  color: $color-primary-light;
  border: 2px solid $color-primary-4;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: $color-primary-1;
  }
}

// Sidebar Controller
.form-wrapper {
    min-width: 42rem;
    width: 42rem;
    height: calc(100vh - 8rem);
    background: $color-primary-light;
    border-right: 2px solid $color-primary-gray;
    overflow: auto;
}

.form-container {
    width: 100%;
    text-align: left;
    font-size: 1.4rem;
    color: $color-primary-4;
}

.form-row {
    width: 100%;
    margin-bottom: 2rem;
    padding: 0 2rem;
    &--flex {
        display: flex;
    }
    &__label {
        font-weight: 500;
        margin: 0.5rem 0;
        display: block;
    }
    &__image {
        max-height: 20rem;
        margin-top: 1rem;
    }
    &__input {
        background: $color-primary-light;
        border: 1px solid $color-primary-gray;
        padding: 0.75rem 1rem;
        width: 100%;
        font-size: 1.4rem;
        margin: 0.25rem 0;
        &--small {
            width: calc(100% / 3.5);
        }
        &--center {
            text-align: center;
        }
    }
    &__color {
      width: 90%;
      border: 1px solid $color-primary-gray;
      height: 4rem;
      padding: .25rem .5rem;
    }
    &__slider {
      width: 100%;
      height: 1.25rem;
      appearance: none;
      background: $color-primary-gray;
      border-radius: 1rem;
    }
    &__split {
        width: 50%;
        &:first-of-type {
            margin-right: 1rem;
        }
    }
    &__button {
      border: 1px solid $color-primary-4;
      background: $color-primary-light;
      padding: .5rem 2rem;
      cursor: pointer;
      margin-bottom: 1rem;
      transition: all 0.2s;
      &:hover {
        background: $color-primary-4;
        color: $color-primary-light;
      }
    }
}

.form-header {
    background: $color-primary-4;
    color: $color-primary-light;
    padding: 0.75rem 2rem;
    border-top: 1px solid $color-primary-gray;
    border-bottom: 1px solid $color-primary-gray;
    margin-bottom: 1rem;
    &__text {
        font-weight: 500;
        text-transform: uppercase;
    }
}

.form-action {
  margin: 3rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
