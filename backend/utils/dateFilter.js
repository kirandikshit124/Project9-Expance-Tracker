const getDateRange = (range) => {
    const now = new Date();
    let startDate;

    switch (range) {
        case 'daily':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'weekly':
            const firstDayOfWeek = now.getDate() - now.getDay();
            startDate = new Date(now.setData(firstDayOfWeek));
            break;
        case 'monthly':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'yearly':
            startDate = new Date(now.getFullYear(), 0, 1);
            break;
        default:
            startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Default to monthly if no valid range is provided
    }
    return { startDate, endDate: new Date() };
};

module.exports = { getDateRange };