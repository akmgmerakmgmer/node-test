const addProductToArray = (model,id,product,next)=>{
    model.findByIdAndUpdate({_id:id},{$push:{products:product} }).then(category=>{
        
    }).catch(next)
}

// const deleteProductFromArray= (model,id,product,next)=>{
//     model.findByIdAndUpdate({_id:id},{$pop:{products:product} }).then(category=>{
        
//     }).catch(next)
// }

module.exports = {addProductToArray}