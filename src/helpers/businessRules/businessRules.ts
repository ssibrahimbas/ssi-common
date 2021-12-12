export interface RuleResult {
    success: boolean;
    message?: string;
}

export default class BusinessRules {
    public static Run(...rules : RuleResult[]): RuleResult | null {
        let result = null;
        let index : number = 0;
        while(result === null && index < rules.length) {
            if(!rules[index].success) {
                result = rules[index];
            }
            index++;
        }
        return result;
    }
}