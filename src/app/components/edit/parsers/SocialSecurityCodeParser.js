// @flow

const parser = (firstRegex: string, str: ?string): {first:?string, last:?string} => {
    const regex = new RegExp("^(" + firstRegex + ")(.*)$")
    let result: {first:?string, last:?string} = {first: null, last: null};
    if (str) {
        const parsingRegex = regex.exec(str);
        result.first = parsingRegex && parsingRegex.length > 1 ? parsingRegex[1] : null;
        result.last = parsingRegex && parsingRegex.length > 2 ? parsingRegex[2] : null;
    }
    return result;
}

function parseField(accumulator: any, key: string, firstRegex: string, value: string, next: ?(accumulator: any, value: string) => void) {
    let parsing = parser(firstRegex, value);
    if (parsing.first) {
        accumulator[key] = parsing.first;
        if (parsing.last) {
            if (next) {
                next(accumulator, parsing.last)
            } else {
                accumulator.rest = parsing.last;
            }
        }
    } else {
        accumulator.rest = value;
    }

}

const parseSocialSecurityNumber = (value: string) => {
    let accu = {};

    let birthNumberFn = (accumulator: any, value: string) => parseField(accumulator, 'birthNumber', '[1-9][0-9]0|[0-9][1-9]0|[0-9][0-9][1-9]', value, null);
    let departementFn = (accumulator: any, value: string) => {
        
        // otherChars = A/B/C
        let bornInFranceMetro = /^(0[1-9]|1[0-9]|2[AB]).*$/g.test(value);
        let bornInDomTom = /^9[78].*$/g.test(value);
        let bornInForeign = /^99.*$/g.test(value);

        if (bornInFranceMetro) {
            let nextFn = (accumulator: any, value: string) => parseField(accumulator, 'commune', '[0-9][0-9][0-9]|9[0-8][0-9]', value, birthNumberFn);
            parseField(accumulator, 'departement', '0[1-9]|1[0-9]|2[AB]|9[6-9]', value, nextFn);
        } else if (bornInDomTom) {
            let nextFn = (accumulator: any, value: string) => parseField(accumulator, 'commune', '0[1-9]|[1-8][0-9]|90', value, birthNumberFn);
            parseField(accumulator, 'departement', '9[78][0-9]', value, nextFn);
        } else if (bornInForeign) {
            let nextFn = (accumulator: any, value: string) => parseField(accumulator, 'commune', '[0-9][0-9][0-9]|9[0-8][0-9]', value, birthNumberFn);
            parseField(accumulator, 'departement', '99', value, nextFn);
        } else {
            accumulator.rest = value;
        }
    }
    let birthMonthFn = (accumulator: any, value: string) => parseField(accumulator, 'birthMonth', '0[1-9]|1[12]', value, departementFn);
    let birthYearFn = (accumulator: any, value: string) => parseField(accumulator, 'birthYear', '[0-9][0-9]', value, birthMonthFn);
    let sexFn = (accumulator: any, value: string) => parseField(accumulator, 'sex', '[123478]', value, birthYearFn);
    let preparedValue = value.toUpperCase().replace(/[^0-9A-Z]/g, '').substr(0, 13);
    sexFn(accu, preparedValue);

    if(accu.birthNumber) {
        let valueForControl = preparedValue.replace('2A', '19').replace('2B', '18');
        let intValue = parseInt(valueForControl,10);
        let controlInt = 97 - (intValue%97);
        let controlValue:string = controlInt < 10 ? `0${controlInt}` : `${controlInt}`;
        accu.control = controlValue;
    }
    return accu;
}

export default parseSocialSecurityNumber