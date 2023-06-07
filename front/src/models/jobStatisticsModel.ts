export interface ArrElem {
    value: string,
    count: number
}

export interface PositionStats {
    skills: {
        value: string;
        count: number;
    }[];
    salaries: {
        maxSalary: number;
        median: number;
        basedOnExperience: {
            value: string;
            count: number;
        }[];
    };
    companies: {
        value: string;
        count: number;
    }[];
    experience: {
        value: string;
        count: number;
    }[];
    applicants: {
        numberOfPostings: number;
        applicantsForOnePosting: number;
    };
    datePosted: {
        value: string;
        count: number;
    }[];
    location: {
        cities: {
            value: string;
            count: number;
        }[];
        countries: {
            value: string;
            count: number;
        }[];
    };
    english: {
        value: string;
        count: number;
    }[];
}