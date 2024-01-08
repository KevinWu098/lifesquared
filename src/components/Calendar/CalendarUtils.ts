export function getWeeksFromStartOfYear(birthdayString: string) {
    const birthday = new Date(birthdayString);

    const startOfYear = new Date(birthday.getFullYear(), 0, 1);
    const timeDifference = birthday.getTime() - startOfYear.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

export function getPastWeeksInBirthYear(birthdayString: string) {
    const birthday = new Date(birthdayString);
    const today = new Date();

    if (today.getFullYear() != birthday.getFullYear()) {
        return 52 - getWeeksFromStartOfYear(birthday.toString());
    }

    const timeDifference = birthday.getTime() - today.getTime();
    const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return weeks;
}

/**
 * Noninclusive refers to non-birth and non-current years
 */
export function getPastWeeksNoninclusive(birthdayString: string) {
    const birthday = new Date(birthdayString);
    const today = new Date();

    return (today.getFullYear() - birthday.getFullYear() - 1) * 52;
}

export function getNonPastWeeks(birthdayString: string, finalYear: number) {
    return (
        finalYear * 52 -
        getWeeksFromStartOfYear(birthdayString) -
        getPastWeeksInBirthYear(birthdayString) -
        getPastWeeksNoninclusive(birthdayString)
    );
}
