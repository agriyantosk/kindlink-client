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
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    const formattedDate = `${day}, ${dayNumber} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return { formattedDate, formattedTime };
};

export const votingPeriodCompare = (timestamp: any) => {
    const currentTime = Date.now();
    const timestampMilliseconds =
        timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

    if (timestampMilliseconds > currentTime) {
        return true;
    } else {
        return false;
    }
};
