const formatDateDDMMYYYY = (date: string) => {
    const dateString = new Date(date);
    const day = dateString.getDate() > 9 ? dateString.getDate() : `0${dateString.getDate()}`;
    const month = dateString.getMonth() + 1 > 9 ? dateString.getMonth() + 1 : `0${dateString.getMonth() + 1}`;
    const dateFormatted = `${day}/${month}/${dateString.getFullYear()}`;

    return dateFormatted;
}

export default formatDateDDMMYYYY;