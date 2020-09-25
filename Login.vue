<template>
  <div class="column  items-center flex-center login">
    <p v-if="user">
      {{ user.user.username }}
    </p>
    <q-form
      class="q-gutter-md self-center"
    >
      <q-input
        filled
        v-model="username"
      />

      <q-input
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Password with toggle"
        lazy-rules
        :rules="[val => val && val.length > 0 || 'Это обязательное поле']"
        v-model="password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <AppButton
          primary
          class="full-width"
          @click="login()"
        >
          Войти
        </AppButton>

        <q-separator
          inset="item"
          class="q-mt-md full-width"
        />

        <AppButton
          flat
          class="full-width q-mt-md"
        >
          Забыл пароль
        </AppButton>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppButton from 'components/base/AppButton.vue';
import { getModule } from 'vuex-module-decorators';
import Auth from 'src/store/modules/Auth';
import { AuthResponse } from 'src/store/modules/models';

@Component({
  components: { AppButton },
})
export default class Login extends Vue {
  isPwd = true
  username = ''
  password = ''
  auth = getModule(Auth, this.$store);

  async login(): void {
    try {
      await this.auth.loginUser({ username: this.username, password: this.password });
      // eslint-disable-next-line no-void
      void this.$router.push({ name: 'ComplexList' });
    } catch (e) {
      console.error(e);
    }
  }

  get user(): AuthResponse {
    return this.auth.user;
  }
}
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
  }
</style>