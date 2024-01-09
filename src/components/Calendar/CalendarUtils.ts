export function getWeeksFromStartOfYear(birthdayString: string) {
    const birthday = new Date(birthdayString);

    const startOfYear = new Date(birthday.getFullYear(), 0, 1);
    const timeDifference = birthday.getTime() - startOfYear.getTime();
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

export function getPastWeeksInBirthYear(
    birthdayString: string,
    calendarString: string | undefined,
) {
    const birthday = new Date(birthdayString);
    const comparisonDate = calendarString
        ? new Date(calendarString)
        : new Date();

    if (comparisonDate.getFullYear() != birthday.getFullYear()) {
        return 52 - getWeeksFromStartOfYear(birthday.toString());
    }

    const timeDifference = birthday.getTime() - comparisonDate.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

/**
 * Noninclusive refers to non-birth and non-current years
 */
export function getPastWeeksNoninclusive(
    birthdayString: string,
    calendarString: string | undefined,
) {
    const birthday = new Date(birthdayString);
    const comparisonDate = calendarString
        ? new Date(calendarString)
        : new Date();

    return (comparisonDate.getFullYear() - birthday.getFullYear() - 1) * 52;
}

export function getNonPastWeeks(
    birthdayString: string,
    finalYear: number,
    calendarDate: string | undefined,
) {
    return (
        finalYear * 52 -
        getWeeksFromStartOfYear(birthdayString) -
        getPastWeeksInBirthYear(birthdayString, calendarDate) -
        getPastWeeksNoninclusive(birthdayString, calendarDate)
    );
}
