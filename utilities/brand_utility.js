const addBrandToArray = (model,id,brand,next)=>{
    model.findByIdAndUpdate({_id:id},{$push:{brands:brand} }).then(category=>{
        
    }).catch(next)
}

const deleteBrandFromArray= (model,id,brand,next)=>{
    model.findByIdAndUpdate({_id:id},{$pop:{brands:brand} }).then(category=>{
        
    }).catch(next)
}

module.exports = {addBrandToArray,deleteBrandFromArray}