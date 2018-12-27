export const login = {
    query: function() {
        return`query login($username: String!, $password: String!){
                    login(username:$username, password:$password)
                }`;
    },
    variables: function(username, password) {
        return {username, password};
    }
};



export const seviyeDersleri = {
    query: function() {
        return`query seviyeDersleri($seviye: Seviye!) {
                  seviyeDersleri(seviye: $seviye){
                    id
                    adi
                    seviye
                  }
                }`;
    },
    variables: function(seviye) {
        return {seviye};
    }
};

