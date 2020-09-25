import {
  Module, VuexModule, Action, Mutation,
} from 'vuex-module-decorators';
import { AuthResponse, UserSubmit } from 'src/store/modules/models';
import { axiosApi, setAuthHeader } from 'src/boot/api';
import { Cookies } from 'quasar';

@Module(
  {
    name: 'Auth',
    namespaced: true,
    stateFactory: true,
  },
)
export default class Auth extends VuexModule {
  public user: AuthResponse|null = null;

  @Mutation
  public SET_USER(user: AuthResponse) {
    this.user = user;
  }

  get getUser() {
    return this.user;
  }

  get token() {
    return Cookies.get('token');
  }

  @Action({ commit: 'SET_USER' })
  public async loginUser(user: UserSubmit): Promise<AuthResponse|undefined> {
    const response = await axiosApi.post('/api/v1/token-auth/', { username: user.username, password: user.password });

    const fetchedData: AuthResponse = (response.data as AuthResponse);
    Cookies.set('token', fetchedData.token, { expires: new Date(fetchedData.exp * 1000) });
    setAuthHeader(fetchedData.token);

    return fetchedData;
  }
}