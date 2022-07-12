import { setProfile } from "../redux/sessionSlice";
import { store } from "../redux/store";
import { fetchProfile } from "./api";

export async function updateProfileInformation() {
  try {
    store.dispatch(setProfile(await fetchProfile()));
  } catch (error) {
    if (!store.getState().session.profile) {
      store.dispatch(setProfile(null));
    }
  }
}
