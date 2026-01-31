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

export function getBlogDateValue(value) {
    if (!value) return 0;

    if (typeof value === 'string') {
        const normalized = value.includes('.') ? value.replace(/\./g, '-') : value;
        const parsed = Date.parse(normalized);
        return Number.isNaN(parsed) ? 0 : parsed;
    }

    if (value instanceof Date) {
        return value.getTime();
    }

    if (typeof value === 'object') {
        if (typeof value.toDate === 'function') {
            return value.toDate().getTime();
        }
        if (typeof value.seconds === 'number') {
            return value.seconds * 1000;
        }
    }

    return 0;
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}
