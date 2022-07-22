export function sort_by_property<T>(key: keyof T, ascending: boolean = true) {
  return (a: T, b: T) => {
    const comparison_result = ascending ? -1 : 1;
    const val_a = a[key];
    const val_b = b[key];

    if (val_a && val_b) {
      if (val_a < val_b) {
        return comparison_result;
      }
      if (val_a > val_b) {
        return -comparison_result;
      }
    } else if (val_a) {
      return -1;
    } else if (val_b) {
      return 1;
    }
    return 0;
  }
}