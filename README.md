## React + Redux + Jest + NodeJS + MongoDB

##### to start MongoDB Server use windows cmd:
```
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath c:\dbs
```
##### to create AV + BV points in MongoDB:
```
npm run create-db
```
##### to start webpack:
```
webpack
```
##### to start server open +1 cmd:
```
npm start
```

##### AV (BV) read logic
1. Read value from BACnet device readAVpromise ->
2. Set value to buffer / Compare value with buffer ->
3. Should we update MongoDB? 
    yes: Trigger update AVtoMongo -> get confirm from DB -> emmit event for socketIO 'update state' -> client event handler: getAV() -> axios.get('/av') -> dispatch(answer from server) -> re-rendering
    no: Skip

##### AV write logic
1. UI: "-" "+" "ok" buttons. Handle submit by dispatching function ->
2. Set value to buffer / Compare value with buffer ->
3. Should we update MongoDB? 
    yes: Trigger update AVtoMongo -> get confirm from DB -> emmit event for socketIO 'update state' -> client event handler: getAV() -> axios.get('/av') -> dispatch(answer from server) -> re-rendering
    no: Skip
