import { setFriends, setProfile } from "../redux/sessionSlice";
import { store } from "../redux/store";
import { fetchFriends, fetchProfile } from "./api";

export async function updateProfileInformation() {
  try {
    store.dispatch(setProfile(await fetchProfile()));
    store.dispatch(setFriends(await fetchFriends()));
  } catch (error) {
    if (!store.getState().session.profile) {
      store.dispatch(setProfile(null));
    }
  }
}
