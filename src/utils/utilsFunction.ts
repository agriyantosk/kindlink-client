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
export const votingPeriodCompare = (timestampSeconds: number) => {
    const currentTimeMilliseconds = Date.now();
    const timestampMilliseconds = timestampSeconds * 1000;

    if (timestampMilliseconds < currentTimeMilliseconds) {
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
    return milliseconds;
};

export const convertVotesToNumber = (votes: any) => {
    return Number(votes);
};

export const formatRemainingTime = (time: any) => {
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

export const convertTimestamp = (timestamp: any) => {
    const date = new Date(timestamp * 1000);

    const day = date.toLocaleDateString("en-US", { weekday: "long" }); // Full weekday name
    const month = date.toLocaleDateString("en-US", { month: "long" }); // Full month name
    const year = date.getFullYear();
    const dateNum = date.getDate();

    return `${day}, ${month} ${dateNum} ${year}`;
};

export const extractErrorMessage = (errorMessage: string) => {
    const reasonSplit = errorMessage.replace(/\n/g, ": ").split(": ");
    if (reasonSplit.length === 2) {
        return reasonSplit[1];
    }
};

export const checkToDeleteFirebaseApprovalWallets = (state: any) => {
    const approvalKeys = [
        "foundationOwnerApproval",
        "foundationCoOwnerApproval",
        "kindlinkApproval",
    ];
    let trueCount = 0;

    for (const key of approvalKeys) {
        if (state.hasOwnProperty(key) && state[key]) {
            trueCount++;
        }
        if (trueCount >= 2) {
            return true;
        }
    }
    return false;
};
