export const calculateLimitPerPage = (windowWidth: number): number => {
  switch (true) {
    case windowWidth >= 1550:
      return 8
    case windowWidth >= 1000:
      return 5
    case windowWidth >= 768:
      return 3
    default:
      return 2
  }
}
