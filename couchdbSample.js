const pouch = require('pouchdb')
const my_data = pouch('http://admin:password@127.0.0.1:5984/my_data')
const find = require('pouchdb-find')
pouch.plugin(find);


const getAllDocs = async () =>{
    try{
        // all docs... remember include_docs if you want the actual records
        const result = await my_data.allDocs({include_docs: true})
        const docs = result.rows // data is in rows
        console.log('docs', docs)
    } catch(ex)
    { console.log('error for all_docs', ex)}
}
getAllDocs() // remember to uncomment me to run 

                            // pass in a document name or use the default addADocument
const addADocument=async(docName='addADocument')=>{
    try{
        // any javascript object
        const someData = {_id: docName,
            someNewData: ['data', 'more data'],
            isCreatedRecord: true
        }
        // use of put to store the data
        await my_data.put(someData)
        console.log('added some data')
        await getAllDocs() // use get allDocs to see that the data is there now
    } catch(ex)
    { console.log('error for add doc', ex)}
}
//  addADocument() // remember to uncomment me to run 

const getDocumentById=async()=>{
    try{
        // create a document with _id getDocumentById
        await addADocument('getDocumentById')
        // get the document by its id
        const newDoc = await my_data.get('getDocumentById')
        console.log('retrieved doc', newDoc)
    }catch(ex)
    { console.log('error for get document', ex) }
}
// getDocumentById() // remember to uncomment me to run 

const findDocumentsByAttribute=async()=>{
    try {
        // NOTE : remember you'll need the find package to run find
        // add a document
        await addADocument('findDocumentsByAttribute')

        // get all documents that have isCreatedRecord: true
        const result = await my_data.find({ 
            selector: {isCreatedRecord: true}
        })
        const foundDocs = result.docs // the data is in docs
        console.log('found docs', foundDocs) // returns an array
        console.log('first doc', foundDocs[0]) // the first document
    } catch(ex)
    { console.log('error for find documents', ex) }
}
// findDocumentsByAttribute() // remember to uncomment me to run 

const updateADocument=async()=>{
    try{
        // add a document
        await addADocument('updateADocument')
        // get the document and change it
        const document = await my_data.get('updateADocument')
        document.changed = true
        // put it back with the change
        await my_data.put(document) // put a second time this time to update
        // get the changed document and display it
        const changedDoc = await my_data.get('updateADocument')
        console.log('document is now', changedDoc)
    } catch(ex)
    { console.log('error on update', ex) }
}
// updateADocument() // remember to uncomment me to run 

const removeADocument=async()=>{
    try{
        // ad a document
        await addADocument('removeADocument')

        // get the document to verify that it was there
        const document = await my_data.get('removeADocument')
        console.log('document before remove was:', document)

        // remove the document
        await my_data.remove(document)

        // show that all docs no longer shows that document
        const allDocuments = await my_data.allDocs({include_docs: true})
        console.log('all allDocumentss after removal of removeADocument:', allDocuments.rows)
    }catch(ex)
    { console.log('error during remove a document', ex) }
}
// removeADocument() // remember to uncomment me to run 