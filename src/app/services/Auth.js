const authenticate = (success: () => void, failure: (string) => void, history: any, email: string, password: string) => {

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Accept', 'application/json');

    return fetch('/login', {method: 'POST', headers: myHeaders, body: JSON.stringify({email, password})})
        .then(
            (res) => {
                if (res.ok) {
                    success();
                    history.push('/search');
                } else {
                    throw {message: `Bad HTTP status code: ${res.status}`};
                }
            }
        ).catch(
            (error) => {
                if (error && error.message) {
                    failure(`Error while parsing fetched data: ${error.message}`);
                }
            }
        );
}

export default authenticate