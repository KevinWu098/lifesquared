export function getUnbornWeeks(birthdayString: string) {
    const birthday = new Date(birthdayString);

    const startOfYear = new Date(birthday.getFullYear(), 0, 1);
    const timeDifference = birthday.getTime() - startOfYear.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)); // Floor to not include current week

    return weeks;
}

export function getPastWeeksCurrentYear(
    birthdayString: string,
    finalYear: number,
) {
    const birthday = new Date(birthdayString);
    const today = new Date();

    if (today.getFullYear() > birthday.getFullYear() + finalYear) {
        return getUnbornWeeks(birthdayString);
    }

    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const timeDifference = today.getTime() - startOfYear.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)); // Floor to not include current week

    return weeks;
}

export function getPastWeeksBirthYear(
    birthdayString: string,
    calendarString: string | undefined,
) {
    const birthday = new Date(birthdayString);
    const calendarCreation = calendarString
        ? new Date(calendarString)
        : new Date();

    if (calendarCreation.getFullYear() != birthday.getFullYear()) {
        return 52 - getUnbornWeeks(birthday.toString());
    }

    const timeDifference = birthday.getTime() - calendarCreation.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

/**
 * Noninclusive refers to non-birth and non-current years
 */
export function getPastWeeksNoninclusive(
    birthdayString: string,
    finalYear: number,
    calendarString: string | undefined,
) {
    const birthday = new Date(birthdayString);
    const calendarCreation = calendarString
        ? new Date(calendarString)
        : new Date();

    return (
        Math.min(
            calendarCreation.getFullYear() - birthday.getFullYear() - 2,
            finalYear - 1,
        ) * 52
    );
}
