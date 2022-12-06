import * as ActionTypes from './actionTypes'

export const Cars = (state ={
    make:[],
    selectedMake:'',
    model:[],
    selectedModel:'',
    year:[],
    selectedYear:'',
    trim:[],
    err:'',
},action) => {
    switch(action.type){
        case ActionTypes.GET_MAKE:
            return {...state,
                make:action.payload,
                selectedMake:'',
                model:[],
                selectedModel:'',
                year:[],
                selectedYear:'',
                trim:[],
                err:'',
            }
        case ActionTypes.GET_MODEL:
            return {...state,
                make:state.make,
                selectedMake:action.payload.selectedMake,
                model:action.payload.data,
                selectedModel:'',
                year:[],
                selectedYear:'',
                trim:[],
                err:'',
            }
        // case ActionTypes.GET_YEAR:
        //     return{...state,make:null,model:null,year:action.payload,trim:null,err:null,}
        // case ActionTypes.GET_TRIM:
        //     return{...state,make:null,model:null,year:null,trim:action.payload,err:null,}
        // case ActionTypes.GET_CAR_DATA_FAILED:
        //     return{...state,make:null,model:null,year:null,trim:null,err:action.payload,}
        default:
            return state;
    }    
}


export const  Selected = (state ={
    make:null,
    model:null,
    year:null,
    trim:null,
    kms:0
},action) => {
    switch (action.type) {
        case ActionTypes.SELECTED_CAR:
                return {
                    make:action.payload.selectedMake,
                    model:action.payload.selectedModel,
                    year:action.payload.selectedYear,
                    trim:action.payload.selectedTrim,
                    kms:action.payload.kms
                }
        default:
            return state;
    }
}