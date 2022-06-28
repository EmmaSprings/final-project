export const BASE_URL = 'https://abc-cbt.herokuapp.com'

export const API_URL = (slug) => `${BASE_URL}/${slug}`

export const GET_NOTE = (noteId) => `${BASE_URL}/notes/${noteId}`