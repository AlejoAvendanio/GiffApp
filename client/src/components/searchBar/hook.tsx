import {useReducer}from 'react'

const ACTION = {
  UPDATE_INPUT : "UPDATE_INPUT",
  UPDATE_RATING : "UPDATE_RATING",
  LOGIN:"LOGIN"
}

const ACTION_REDUCER = {

  [ACTION.UPDATE_INPUT] : (state:any,action:any)=>({
    ...state,
    input: action.payload
  }),

  [ACTION.UPDATE_RATING] : (state:any,action:any)=>({
    ...state,
    rating: action.payload
  })
  
}

const REDUCER = (state:any,action:any)=>{
  const actionReducer = ACTION_REDUCER[action.type]
  return actionReducer ? actionReducer(state,action) : state
}

export default function useForm ({initalInput ="", initialRating="g"}){

  const [state, dispatch] = useReducer(REDUCER,{
      input:initalInput,
      rating:initialRating
    })

    const {input,rating}= state

    return{
      input,
      rating,
      updateInput: (input:string) => 
        dispatch({type:ACTION.UPDATE_INPUT,payload:input}),
      updateRating:(rating:string) => 
        dispatch({type:ACTION.UPDATE_RATING,payload:rating})
    }
}
