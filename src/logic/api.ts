import { type v1 } from "moos-api";
import { setCSRFToken } from "../redux/sessionSlice";
import { store } from "../redux/store";

export async function fetchCollection(
  options: v1.operations["post-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<v1.SeasonGroup | null> {
  return (
    ((await _csrfFetch("/profile/collection", options, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.SeasonGroup) ?? null
  );
}

export async function createCollection(
  options: v1.operations["put-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<v1.SeasonGroup | null> {
  return (
    ((await _csrfFetch("/profile/collection", options, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.SeasonGroup) ?? null
  );
}

export async function updateCollection(
  options: v1.operations["patch-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/collection", options, { method: "PATCH" }).then((response) => response.ok)) ?? false
  );
}

export async function deleteCollection(
  options: v1.operations["delete-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/collection", options, {
      method: "DELETE"
    }).then((response) => response.ok)) ?? false
  );
}

export async function fetchSeason(
  options: v1.operations["post-profile-list"]["requestBody"]["content"]["application/json"]
): Promise<v1.Season | null> {
  return (
    ((await _csrfFetch("/profile/list", options, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.Season) ?? null
  );
}

export async function createSeason(
  options: v1.operations["put-profile-list"]["requestBody"]["content"]["application/json"]
): Promise<v1.Season | null> {
  return (
    ((await _csrfFetch("/profile/list", options, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.Season) ?? null
  );
}

export async function updateSeason(
  options: v1.operations["patch-profile-list"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/list", options, { method: "PATCH" }).then((response) => response.ok)) ?? false;
}

export async function deleteSeason(
  options: v1.operations["delete-profile-list"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/list", options, { method: "DELETE" }).then((response) => response.ok)) ?? false;
}

export async function fetchEpisode(
  options: v1.operations["post-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<v1.Episode | null> {
  return (
    ((await _csrfFetch("/profile/episode", options, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.Episode) ?? null
  );
}

export async function createEpisode(
  options: v1.operations["put-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<v1.Episode | null> {
  return (
    ((await _csrfFetch("/profile/episode", options, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.Episode) ?? null
  );
}

export async function updateEpisode(
  options: v1.operations["patch-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/episode", options, { method: "PATCH" }).then((response) => response.ok)) ?? false;
}

export async function deleteEpisode(
  options: v1.operations["delete-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/episode", options, { method: "DELETE" }).then((response) => response.ok)) ?? false;
}

export async function fetchSource(
  options: v1.operations["post-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["post-profile-source"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/source", options, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-source"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createSource(
  options: v1.operations["put-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<v1.Source | null> {
  return (
    ((await _csrfFetch("/profile/source", options, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.Source) ?? null
  );
}

export async function updateSource(
  options: v1.operations["patch-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/source", options, { method: "PATCH" }).then((response) => response.ok)) ?? false;
}

export async function deleteSource(
  options: v1.operations["delete-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/source", options, { method: "DELETE" }).then((response) => response.ok)) ?? false;
}

export async function fetchFile(
  options: v1.operations["get-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["get-profile-file"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/file", options, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["get-profile-file"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createFile(
  options: v1.operations["put-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["put-profile-file"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/file", options, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-file"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateFile(
  options: v1.operations["patch-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/file", options, { method: "PATCH" }).then((response) => response.ok)) ?? false;
}

export async function deleteFile(
  options: v1.operations["delete-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile/file", options, { method: "DELETE" }).then((response) => response.ok)) ?? false;
}

export async function fetchFiles(): Promise<
  v1.operations["get-profile-files"]["responses"]["200"]["content"]["application/json"] | null
> {
  return (
    ((await _csrfFetch("/profile/files", undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["get-profile-files"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchProfile(): Promise<v1.UserProfile | null> {
  return _csrfFetch("/profile", undefined, { method: "POST" }).then((response) => response.json());
}

export async function patchProfile(
  parameters: v1.operations["patch-profile"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return _csrfFetch("/profile", parameters, { method: "PATCH" }).then((response) => response.ok);
}

export async function fetchKnown(
  parameters: v1.operations["post-profile-known"]["requestBody"]["content"]["application/json"]
): Promise<v1.KnownUserProfile | null> {
  return _csrfFetch("/profile/known", parameters, { method: "POST" }).then((response) => response.json());
}

export async function addKnown(
  parameters: v1.operations["put-profile-known"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return _csrfFetch("/profile/known", parameters, { method: "PUT" }).then((response) => response.ok);
}

export async function removeKnown(
  parameters: v1.operations["delete-profile-known"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return _csrfFetch("/profile/known", parameters, { method: "DELETE" }).then((response) => response.ok);
}

export async function requestSessionCookie(idToken: string): Promise<boolean> {
  const body: v1.operations["request-session"]["requestBody"]["content"]["application/json"] = {
    token: idToken
  };
  return _csrfFetch("/session", body, { method: "POST" }).then((response) => response.ok);
}

export async function revokeSessionCookie(): Promise<boolean> {
  return _csrfFetch("/session", undefined, { method: "DELETE" }).then((response) => response.ok);
}

export async function requestCSRFToken(): Promise<Response> {
  return _fetch("/csrf-token", undefined, { method: "GET" });
}

export async function testCSRFToken(): Promise<Response> {
  return _csrfFetch("/csrf-token", undefined, { method: "POST" });
}

async function _csrfFetch(
  endpoint: keyof v1.paths,
  body?: object,
  init?: RequestInit,
  retry = true
): Promise<Response> {
  const state = store.getState();
  let token = state.session.csrfToken;
  if (!token) {
    token = (await (await requestCSRFToken()).json())._csrf;
    store.dispatch(setCSRFToken(token));
  }
  const response = await _fetch(endpoint, body, {
    ...init,
    headers: {
      "CSRF-Token": token ?? "",
      ...init?.headers
    }
  });
  if (response.status === 403 && retry) {
    store.dispatch(setCSRFToken((await (await requestCSRFToken()).json())._csrf));
    return _csrfFetch(endpoint, body, init, false);
  }
  return response;
}

async function _fetch(endpoint: keyof v1.paths, body?: object, init?: RequestInit): Promise<Response> {
  return fetch(`${import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"}/api/v1${endpoint}`, {
    method: "POST",
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });
}
