import { searchStateType } from '../../reducers.type'

const INITIAL_STATE = {
  isSearchFetching: false,
  searchedData: null,
  searcherror: undefined,
  noDataFound: [{ mAddress: 'No matching query' }],
  mapZIndex: 0,
}

export const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchStateType.searchStart:
      return { ...state, isSearchFetching: true }
    case searchStateType.searchSuccess:
      return { ...state, searchedData: action.payload, isSearchFetching: false }
    case searchStateType.searchFailure:
      return { ...state, searcherror: action.payload, isSearchFetching: false }
    case 'CHANGE_Z_INDEX':
      return { ...state, mapZIndex: action.payload }
    case 'NO_DATA_FOUND':
      return { ...state, isSearchFetching: false }
    default:
      return state
  }
}
