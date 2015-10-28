mongo = require 'mongodb'
express = require 'express'
monk = require 'monk'

console.log "here"

db = 'localhost:27017/bites' 
app = new express()
console.log "here"
app.set('port',3100)
app.use(express.static(__dirname + '/public'))

bites = db.get("bites")

app.get '/', (req,res)->
  "hi"

