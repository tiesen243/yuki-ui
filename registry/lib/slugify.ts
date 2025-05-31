function slugify(text: string) {
  return (
    text
      .toLowerCase()
      // Replace Vietnamese accented characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      // Remove special characters
      .replace(/[^a-z0-9\s-]/g, '')
      // Replace whitespace and hyphens with single hyphen
      .replace(/[\s-]+/g, '-')
      // Trim hyphens from start and end
      .replace(/^-+|-+$/g, '')
  )
}

export { slugify }
