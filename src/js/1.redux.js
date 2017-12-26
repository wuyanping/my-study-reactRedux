/**
三大原则
1.) 单一数据源
2.) State 是只读的
3.) 使用纯函数来执行修改
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import {Provider, connect} from 'react-redux';

store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

// combineReducers作用:把一个由多个不同 reducer 函数作为 value 的 object 合并成一个最终的 reducer 函数
let reducer = combineReducers({ visibilityFilter, todos })
let store = createStore(reducer)

ReactDOM.render(
    ,
    document.getElementById('root')
);
