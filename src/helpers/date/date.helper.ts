class DateHelper {

    /**
     * Returns the current date in the format YYYY-MM-DD
     * @returns {number} Returns the millisecond difference between two dates.
     */
    getDateDifferent(date: string): number {
        const parsedDate = new Date(date);
        const now = new Date(Date.now());
        return Math.abs(now.getTime() - parsedDate.getTime());
    }

    /**
     * @param {string} date date to compare
     * @param {number} minute this is optional. Default 3 minute.
     * @returns {boolean} returns true if the entered date is your/3 minutes or more from now, false otherwise.
     * */
    checkDateIsValid(date: string, minute?: number): boolean {
        const different = this.getDateDifferent(date);
        return different > 1000 * 60 * (minute || 3);
    }

    /**
     * @param {number} expiresDate - time in milliseconds
     * @return {boolean} Returns true if the time has not passed, false if the time has passed.
     * */
    checkExpiresDateIsValid(expiresDate: number): boolean {
        const now = Math.ceil((new Date().getTime()) / 1000);
        return expiresDate > now;
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Returns the minute difference from the entered date so far.
     * */
    calculatePassedMinutes(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 60));
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Returns the minute difference from the entered date to now.
     * */
    calculatePassedHours(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 3600));
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Returns the day difference from the entered date to now.
     * */
    calculatePassedDays(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 3600 * 24));
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Returns the week difference from the entered date to now.
     * */
    calculatePassedWeeks(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 3600 * 24 * 7));
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Returns the month difference from the entered date to now.
     * */
    calculatePassedMonths(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 3600 * 24 * 30));
    }

    /**
     * @param {string} date date to compare
     * @returns {number} Return the year difference from the entered date to now.
     * */
    calculatePassedYears(date: string): number {
        const different = this.getDateDifferent(date);
        return Math.ceil(different / (1000 * 3600 * 24 * 365));
    }

    /**
     * @param {Date} date date to format
     * @returns {string} Formats and returns the entered date.
     * */
    calculateYYYYMMDD(date: Date): string {
        return `${date.getFullYear()}-${this.getBinaryDate(date.getMonth() + 1)}-${this.getBinaryDate(date.getDate())}`;
    };

    /**
 * @param {Date} date date to format
 * @returns {string} Formats and returns the entered date.
 * @description It does a 01, 02, 03 style formatting for months less than 10 and days
 * */
    getBinaryDate(date: number): string {
        if (date < 10) {
            return `0${date}`;
        }
        return `${date}`;
    };

    /**
     * @description Returns 30 days ago
     * */
    getPrior30day(): Date {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return new Date(date);
    }

    /**
     * @param datetime date to check
     * @returns Is the date a valid date?
     */
    checkIsInvalidDate(datetime: any): boolean {
        return isNaN(Date.parse(datetime))
    }

}

const dateHelper = new DateHelper();
export { dateHelper as default };
