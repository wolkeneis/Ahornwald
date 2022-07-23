import { type v1 } from "moos-api";
import { setCSRFToken } from "../redux/sessionSlice";
import { store } from "../redux/store";

export async function fetchProfile(): Promise<v1.UserProfile | null> {
  return (
    ((await _csrfFetch("/profile", undefined, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["fetch-profile"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function patchProfile(
  body: v1.operations["patch-profile"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (await _csrfFetch("/profile", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ?? false;
}

export async function fetchApplications(): Promise<v1.Application[] | null> {
  return (
    ((await _csrfFetch("/profile/applications", undefined, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-applications"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFriends(): Promise<v1.Friend[] | null> {
  return (
    ((await _csrfFetch("/profile/friends", undefined, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-friends"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function addFriend(
  parameters: v1.operations["put-profile-friend"]["parameters"]["path"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/friend/{friendId}", parameters, undefined, { method: "PUT" }).then(
      (response) => response.ok
    )) ?? false
  );
}

export async function removeFriend(
  parameters: v1.operations["delete-profile-friend"]["parameters"]["path"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/friend/{friendId}", parameters, undefined, { method: "DELETE" }).then(
      (response) => response.ok
    )) ?? false
  );
}

export async function fetchFriendApplications(
  parameters: v1.operations["post-profile-friend-applications"]["parameters"]["path"]
): Promise<v1.Application[] | null> {
  return (
    ((await _csrfFetch("/profile/friend/{friendId}/applications", parameters, undefined, { method: "POST" }).then(
      (response) => response.json()
    )) as v1.operations["post-profile-friend-applications"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFriendFiles(
  parameters: v1.operations["post-profile-friend-files"]["parameters"]["path"]
): Promise<v1.File[] | null> {
  return (
    ((await _csrfFetch("/profile/friend/{friendId}/files", parameters, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-friend-files"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFriendCollections(
  parameters: v1.operations["post-profile-friend-collections"]["parameters"]["path"]
): Promise<v1.CollectionPreview[] | null> {
  return (
    ((await _csrfFetch("/profile/friend/{friendId}/collections", parameters, undefined, { method: "POST" }).then(
      (response) => response.json()
    )) as v1.operations["post-profile-friend-collections"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFriendFriends(
  parameters: v1.operations["post-profile-friend-friends"]["parameters"]["path"]
): Promise<v1.Friend[] | null> {
  return (
    ((await _csrfFetch("/profile/friend/{friendId}/friends", parameters, undefined, { method: "POST" }).then(
      (response) => response.json()
    )) as v1.operations["post-profile-friend-friends"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFiles(): Promise<v1.File[] | null> {
  return (
    ((await _csrfFetch("/profile/files", undefined, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-files"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchFile(
  body: v1.operations["post-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["post-profile-file"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/file", undefined, body, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-file"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createFile(
  body: v1.operations["put-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["put-profile-file"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/file", undefined, body, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-file"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateFile(
  body: v1.operations["patch-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/file", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ?? false
  );
}

export async function deleteFile(
  body: v1.operations["delete-profile-file"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/file", undefined, body, { method: "DELETE" }).then((response) => response.ok)) ?? false
  );
}

export async function fetchCollections(): Promise<v1.CollectionPreview[] | null> {
  return (
    ((await _csrfFetch("/profile/collections", undefined, undefined, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-collections"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function fetchCollection(
  body: v1.operations["post-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<v1.Collection | null> {
  return (
    ((await _csrfFetch("/profile/collection", undefined, body, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-collection"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createCollection(
  body: v1.operations["put-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<v1.Collection | null> {
  return (
    ((await _csrfFetch("/profile/collection", undefined, body, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-collection"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateCollection(
  body: v1.operations["patch-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/collection", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ??
    false
  );
}

export async function deleteCollection(
  body: v1.operations["delete-profile-collection"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/collection", undefined, body, {
      method: "DELETE"
    }).then((response) => response.ok)) ?? false
  );
}

export async function fetchSeason(
  body: v1.operations["post-profile-season"]["requestBody"]["content"]["application/json"]
): Promise<v1.Season | null> {
  return (
    ((await _csrfFetch("/profile/season", undefined, body, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-season"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createSeason(
  body: v1.operations["put-profile-season"]["requestBody"]["content"]["application/json"]
): Promise<v1.Season | null> {
  return (
    ((await _csrfFetch("/profile/season", undefined, body, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-season"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateSeason(
  body: v1.operations["patch-profile-season"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/season", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ?? false
  );
}

export async function deleteSeason(
  body: v1.operations["delete-profile-season"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/season", undefined, body, { method: "DELETE" }).then((response) => response.ok)) ??
    false
  );
}

export async function fetchEpisode(
  body: v1.operations["post-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<v1.Episode | null> {
  return (
    ((await _csrfFetch("/profile/episode", undefined, body, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-episode"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createEpisode(
  body: v1.operations["put-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<v1.Episode | null> {
  return (
    ((await _csrfFetch("/profile/episode", undefined, body, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-episode"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateEpisode(
  body: v1.operations["patch-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/episode", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ??
    false
  );
}

export async function deleteEpisode(
  body: v1.operations["delete-profile-episode"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/episode", undefined, body, { method: "DELETE" }).then((response) => response.ok)) ??
    false
  );
}

export async function fetchSource(
  body: v1.operations["post-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<v1.operations["post-profile-source"]["responses"]["200"]["content"]["application/json"] | null> {
  return (
    ((await _csrfFetch("/profile/source", undefined, body, { method: "POST" }).then((response) =>
      response.json()
    )) as v1.operations["post-profile-source"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function createSource(
  body: v1.operations["put-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<v1.Source | null> {
  return (
    ((await _csrfFetch("/profile/source", undefined, body, { method: "PUT" }).then((response) =>
      response.json()
    )) as v1.operations["put-profile-source"]["responses"]["200"]["content"]["application/json"]) ?? null
  );
}

export async function updateSource(
  body: v1.operations["patch-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/source", undefined, body, { method: "PATCH" }).then((response) => response.ok)) ?? false
  );
}

export async function deleteSource(
  body: v1.operations["delete-profile-source"]["requestBody"]["content"]["application/json"]
): Promise<boolean> {
  return (
    (await _csrfFetch("/profile/source", undefined, body, { method: "DELETE" }).then((response) => response.ok)) ??
    false
  );
}

export async function requestSessionCookie(idToken: string): Promise<boolean> {
  const body: v1.operations["request-session"]["requestBody"]["content"]["application/json"] = {
    token: idToken
  };
  return (await _csrfFetch("/session", undefined, body, { method: "POST" }).then((response) => response.ok)) ?? false;
}

export async function revokeSessionCookie(): Promise<boolean> {
  return (
    (await _csrfFetch("/session", undefined, undefined, { method: "DELETE" }).then((response) => response.ok)) ?? false
  );
}

export async function requestCSRFToken(): Promise<Response> {
  return _fetch("/csrf-token", undefined, undefined, { method: "GET" });
}

export async function testCSRFToken(): Promise<Response> {
  return _csrfFetch("/csrf-token", undefined, undefined, { method: "POST" });
}

async function _csrfFetch(
  endpoint: keyof v1.paths,
  parameters?: {
    [key: string]: string;
  },
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
  const response = await _fetch(endpoint, parameters, body, {
    ...init,
    headers: {
      "CSRF-Token": token ?? "",
      ...init?.headers
    }
  });
  if (response.status === 403 && retry) {
    store.dispatch(setCSRFToken((await (await requestCSRFToken()).json())._csrf));
    return _csrfFetch(endpoint, parameters, body, init, false);
  }
  return response;
}

async function _fetch(
  endpoint: keyof v1.paths,
  parameters?: {
    [key: string]: string;
  },
  body?: object,
  init?: RequestInit
): Promise<Response> {
  let finalEndpoint: string = endpoint;
  for (const [key, value] of Object.entries(parameters ?? {})) {
    finalEndpoint = finalEndpoint.replace(`{${key}}`, value);
  }
  return fetch(`${import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"}/api/v1${finalEndpoint}`, {
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
