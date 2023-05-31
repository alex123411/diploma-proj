
const baseURL = "http://localhost:8081/api/auth/"

class TestService {


    getData(){
        return {
            data: {
                string: 'random str'
            },
            timestamp:  new Date()
        }
    }

}

export default TestService