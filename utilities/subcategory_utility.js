const addSubcategoryToArray = (model,id,subcategory,next)=>{
    model.findByIdAndUpdate({_id:id},{$push:{subcategories:subcategory} }).then(category=>{
        
    }).catch(next)
}

const deleteSubcategoryFromArray= (model,id,subcategory,next)=>{
    model.findByIdAndUpdate({_id:id},{$pop:{subcategories:subcategory} }).then(category=>{
        
    }).catch(next)
}

module.exports = {addSubcategoryToArray,deleteSubcategoryFromArray}