export const BASE_URL = 'http://localhost:8080'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const GET_NOTE = (noteId) => `${BASE_URL}/notes/${noteId}`