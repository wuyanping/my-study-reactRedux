/**
 * Created by chenanguo on 2016/10/14.
 * Redux 的设计思想很简单，就两句话。
（1）Web 应用是一个状态机，视图与状态是一一对应的。
（2）所有的状态，保存在一个对象里面。
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';

// React component
class Counter extends React.Component {
    render() {
        const {value, onIncreaseClick} = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

Counter.propTypes = {
    value: React.PropTypes.number.isRequired,
    onIncreaseClick: React.PropTypes.func.isRequired
};

// 2. Action：要做的动作的类型 (Action 是一个对象,其中的type属性是必须的，)
// 一个 State 对应一个 View。反之亦然。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
const increaseAction = {type: 'increase'};

// 上面代码中，Action 的名称是increase，它携带的信息的字段是payload
// 可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

// Reducer作用： 根据 Action 来更新 State。
// 首先定义一个改变数据的函数，成为reducer
// 4.Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
function counter(state = {count: 0}, action) {
    const count = state.count;
    switch (action.type) {
        case 'increase':
            return {count: count + 1};
        default:
            return state
    }
}

// 1. Store
const store = createStore(counter);  //返回新生成的 Store 对象。

// Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
// Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

// 作用===：外部state改变 UI组件 的props值。
// mapStateToProps是一个函数，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
// mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。
// 使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
// connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
function mapStateToProps(state) {
    return {
        value: state.count
    }
}

// 作用===：返回一个对象，定义了 UI组件 的参数怎样发出 Action。
// mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。
// 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。
// mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
function mapDispatchToProps(dispatch) {
    // 3.store.dispatch()是 View 发出 Action 的唯一方法。
    return {
        onIncreaseClick: () => dispatch(increaseAction)
    }
}

// connect方法作用===：用于从 UI 组件生成容器组件。
// React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。
// UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。
// 如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
// React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

// React-Redux 提供connect方法，用于从 UI 组件生成容器组件。
// Counter是 UI 组件，App就是由 React-Redux 通过connect方法自动生成的容器组件。

// 为了定义业务逻辑，需要给出下面两方面的信息。
//（1）输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数。
//（2）输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。

// connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


// connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。
// React-Redux 提供Provider组件，可以让容器组件（ 下面的 <App /> ）拿到state。
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
