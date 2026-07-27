# Pagination Component

The Pagination component navigates through multi-page lists and datasets.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `currentPage` | `number` | `1` | Active page index |
| `totalPages` | `number` | `1` | Total page count |
| `onPageChange` | `(page: number) => void` | `undefined` | Callback on page navigation |

## Code Example

```tsx
<Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
```
