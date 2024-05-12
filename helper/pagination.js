exports.paginatedArray = (items, currentPage = 1, pageSize = 10) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedItems = items.slice(startIndex, endIndex);

    return {
        currentPage,
        pageSize,
        totalItems: items.length,
        totalPages: Math.ceil(items.length / pageSize),
        data: paginatedItems
    };
};


// exports.paginatedArray = (array, size, page) => {
//     const startIndex = (page && size) ? ((+page - 1) * +size) : 0;
//     const endIndex = size ? startIndex + +size : array.length;
//     const totalPages = Math.ceil(array?.length / +size);
//     const docs = array?.slice(startIndex, endIndex);
//     return {
//       data: docs,
//       pagination: {
//         totalItems: array?.length,
//         totalPages: totalPages,
//         currentPage: +page,
//         pageSize: +size
//       }
//     }
//   }