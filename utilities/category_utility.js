const addCategoryToArray = (model,id,category,next)=>{
    model.findByIdAndUpdate({_id:id},{$push:{categories:category} }).then(category=>{
        
    }).catch(next)
}

const deleteCategoryFromArray= (model,id,category,next)=>{
    model.findByIdAndUpdate({_id:id},{$pop:{categories:category} }).then(category=>{
        
    }).catch(next)
}

module.exports = {addCategoryToArray,deleteCategoryFromArray}