export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const renderOptions = (arr) => {
    const results = []
    if (Array.isArray(arr)) {
        arr.forEach((opt) => {
            results.push({
                value: opt,
                label: opt,
            });
        });
    }
    results.push({
        lable: 'New Type',
        value: 'New Type',
        className: 'add-type-option'
    })
    return results;
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} đ`
    } catch (err) {
        return null
    }
}