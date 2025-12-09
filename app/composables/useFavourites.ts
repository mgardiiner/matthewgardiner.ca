export const useFavourites = () => {
  const favs = useState<number[]>('movieFavourites', () => {
    if (process.client) {
      try {
        const raw = localStorage.getItem('movieFavourites')
        return raw ? JSON.parse(raw) : []
      } catch {
        return []
      }
    }
    return []
  })

  const isFavourite = (id: number) => favs.value.includes(id)

  const toggleFavourite = (id: number) => {
    if (isFavourite(id)) {
      favs.value = favs.value.filter(x => x !== id)
    } else {
      favs.value.push(id)
    }
    if (process.client) {
      localStorage.setItem('movieFavourites', JSON.stringify(favs.value))
    }
  }

  return { favs, isFavourite, toggleFavourite }
}
