import {GraphQLClient} from 'graphql-request';

export const gq = {
    token : '',
    client: function() {
        let headers = {};
        if (this.token) {
            headers = { 'Authorization': 'Bearer ' + this.token };
        }
        return new GraphQLClient("https://sonnod.herokuapp.com/graphql", {headers});
    },
};

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

export const kurslar = {
    query: function() {
        return`query getCourses($topic: String!) {
                    kurslar: courses(topic:$topic) {
                        ...courseFields
                  }
               }
                
               fragment courseFields on Course {
                  title
                  author
                  description
                  topic
                  url
                  calc
               }`;
    },
    variables: function(topic) {
        return {topic};
    }
};
