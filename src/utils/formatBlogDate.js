export function formatBlogDate(value) {
    if (!value) return '';

    if (typeof value === 'string') {
        return value;
    }

    if (value instanceof Date) {
        return formatDate(value);
    }

    if (typeof value === 'object') {
        if (typeof value.toDate === 'function') {
            return formatDate(value.toDate());
        }
        if (typeof value.seconds === 'number') {
            return formatDate(new Date(value.seconds * 1000));
        }
    }

    return '';
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}
