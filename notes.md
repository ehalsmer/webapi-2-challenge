steps

- git status
- mkdir folderName
- cd folderName
- git init
- npm init -y
- code .
- npm i nodemon -D <- install nodemon as a development time dependency
- npx gitignore node
-

endpoint (url + http method) === function

POST /api/movies (body: movie) === postApiMovies(movie)

| non REST         | REST                   |
| :--------------- | :--------------------- |
| /createMovie     | POST /api/movies       |
| /removeMovie/:id | DELETE /api/movies/:id |

Other Approaches to building Web APIs

- GraphQL
- gRPC
- RPC
- SOAP

Query String

https://www.google.com
/search
? beginning of query string
q=mdn+http+query+string key/value pair separated by =
& key/value pair separator
oq=mdn+http+query+string
&
aqs=chrome..69i57.5023j0j4
&
sourceid=chrome
&
ie=UTF-8
