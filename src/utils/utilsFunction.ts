export const firebaseTimestampToDate = (timestamp: any) => {
    const date = new Date(
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );

    // Array of month names
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayNumber = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day}, ${dayNumber} ${month} ${year}`;

    return formattedDate;
};
