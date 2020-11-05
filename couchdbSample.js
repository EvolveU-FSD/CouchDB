const pouch = require('pouchdb')
const my_data = pouch('http://admin:password@127.0.0.1:5984/my_data')

pouch.plugin(require('pouchdb-find'));


const getAllDocs = async () =>{
    try{
        const result = await my_data.allDocs({include_docs: true})
        const docs = result.rows
        console.log('docs', docs)
    } catch(ex)
    { console.log('error for all_docs', ex)}
}
// getAllDocs()

const addADocument=async(docName='addADocument')=>{
    try{
        const someData = {_id: docName,
            someNewData: ['data', 'more data'],
            isCreatedRecord: true
        }

        await my_data.put(someData)
        console.log('added some data')
        await getAllDocs()
    } catch(ex)
    { console.log('error for add doc', ex)}
}
//  addADocument()

const getDocumentById=async()=>{
    try{
        await addADocument('getDocumentById')
        const newDoc = await my_data.get('getDocumentById')
        console.log('retrieved doc', newDoc)
    }catch(ex)
    { console.log('error for get document', ex) }
}
// getDocumentById()

const findDocumentsByAttribute=async()=>{
    try {
        await addADocument('findDocumentsByAttribute')
        const result = await my_data.find({ 
            selector: {isCreatedRecord: true}
        })
        const foundDocs = result.docs
        console.log('found docs', foundDocs) // returns an array
        console.log('first doc', foundDocs[0])
    } catch(ex)
    { console.log('error for find documents', ex) }
}
// findDocumentsByAttribute()

const updateADocument=async()=>{
    try{
        await addADocument('updateADocument')
        const document = await my_data.get('updateADocument')
        document.changed = true
        await my_data.put(document) // put again
        const changedDoc = await my_data.get('updateADocument')
        console.log('document is now', changedDoc)
    } catch(ex)
    { console.log('error on update', ex) }
}
// updateADocument()

const removeADocument=async()=>{
    try{
        await addADocument('removeADocument')
        const document = await my_data.get('removeADocument')
        console.log('document before remove was:', document)
        await my_data.remove(document)
        const allDocuments = await my_data.allDocs({include_docs: true})
        console.log('all allDocumentss after removal of removeADocument:', allDocuments.rows)
    }catch(ex)
    { console.log('error during remove a document', ex) }
}
// removeADocument()