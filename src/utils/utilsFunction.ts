interface FirebaseTimestamp {
    seconds: number;
    nanoseconds: number;
}

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

export const dateToFirebaseTimestamp = (date: any): FirebaseTimestamp => {
    const seconds = Math.floor(date / 1000);
    const nanoseconds = (date % 1000) * 1000000;
    return { seconds, nanoseconds };
};

export const convertTimestampToDateString = (timestamp: any) => {
    const milliseconds = Number(timestamp) * 1000;
    const date = new Date(milliseconds);
    console.log(Date.now());
    return milliseconds;
};

export const convertVotesToNumber = (votes: any) => {
    return Number(votes);
};

export const formatTime = (time: any) => {
    const days = Math.floor(time?.remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (time?.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (time?.remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((time?.remainingTime % (1000 * 60)) / 1000);
    return `${days.toString().padStart(2, "0")}d: ${hours
        .toString()
        .padStart(2, "0")}h: ${minutes.toString().padStart(2, "0")}m: ${seconds
        .toString()
        .padStart(2, "0")}s`;
};
